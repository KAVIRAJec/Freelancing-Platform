import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../Services/auth.service';
import { ProposalModel } from '../../Models/Proposal.model';
import { selectAllProposals, selectProposalLoading, selectProposalError } from '../../NgRx/Proposal/proposal.selector';
import * as ProposalActions from '../../NgRx/Proposal/proposal.actions';
import { ToastrService } from 'ngx-toastr';
import { ClientModel } from '../../Models/Client.model';
import { FreelancerModel } from '../../Models/Freelancer.model';
import { CommonModule } from '@angular/common';
import { ProjectProposalService } from '../../Services/projectProposal.service';
import { TimespanToReadablePipe } from '../../Pipes/timespan-to-readable.pipe';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-proposal',
  templateUrl: './my-proposal.html',
  styleUrl: './my-proposal.css',
  standalone: true,
  imports: [CommonModule, FormsModule, TimespanToReadablePipe, ReactiveFormsModule]
})
export class MyProposal implements OnInit {
  proposals;
  loading;
  error;
  user = signal<ClientModel | FreelancerModel | null>(null);
  userRole = signal<'client' | 'freelancer' | null>(null);

  editForm: FormGroup;

  constructor(
    private store: Store,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private projectProposalService: ProjectProposalService,
    private fb: FormBuilder
  ) {
    this.proposals = this.store.selectSignal(selectAllProposals);
    this.loading = this.store.selectSignal(selectProposalLoading);
    this.error = this.store.selectSignal(selectProposalError);
    this.authService.user$.subscribe(user => {
      this.user.set(user);
      if (user) {
        if ('companyName' in user) {
          this.store.dispatch(ProposalActions.loadProposals({}));
          this.userRole.set('client');
        } else {
          this.store.dispatch(ProposalActions.loadProposals({})); // fallback: load all, filter in template
          this.userRole.set('freelancer');
        }
      }
    });
    effect(() => {
      if (this.error()) {
        this.toastr.error(typeof this.error() === 'string' ? this.error() ?? 'An error occurred' : 'An error occurred');
      }
    });
    this.editForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      proposedAmount: [null, [Validators.required, Validators.min(1)]],
      proposedDuration: ['', [Validators.required]]
    });
  }
  
  ngOnInit() {}

  // For edit modal
  editingProposal = signal<ProposalModel | null>(null);
  showEditModal = signal(false);

  canEditOrWithdraw(proposal: ProposalModel) {
    return this.userRole() === 'freelancer' && proposal.freelancer.id === this.user()?.id && !proposal.isAccepted && proposal.isActive && !proposal.isRejected;
  }

  canAcceptOrReject(proposal: ProposalModel) {
    return this.userRole() === 'client' && proposal.project.clientId === this.user()?.id && !proposal.isAccepted && proposal.isActive && !proposal.isRejected;
  }

  onEdit(proposal: ProposalModel) {
    this.editingProposal.set(proposal);
    this.editForm.setValue({
      description: proposal.description,
      proposedAmount: proposal.proposedAmount,
      proposedDuration: proposal.proposedDuration
    });
    this.showEditModal.set(true);
  }

  onWithdraw(proposal: ProposalModel) {
    this.store.dispatch(ProposalActions.deleteProposal({ proposalId: proposal.id }));
    this.toastr.success('Proposal withdrawn');
  }

  onAccept(proposal: ProposalModel) {
    const projectId = proposal.project.id;
    const proposalId = proposal.id;
    this.projectProposalService.AcceptProposal(projectId, proposalId).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success('Proposal accepted!');
          this.store.dispatch(ProposalActions.loadProposals({}));
        } else {
          this.toastr.error(res?.message || 'Failed to accept proposal');
        }
      },
      error: () => {
        this.toastr.error('Error accepting proposal');
      }
    });
  }

  onReject(proposal: ProposalModel) {
    const projectId = proposal.project.id;
    const proposalId = proposal.id;
    this.projectProposalService.RejectProposal(projectId, proposalId).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastr.success('Proposal rejected!');
          this.store.dispatch(ProposalActions.loadProposals({}));
        } else {
          this.toastr.error(res?.message || 'Failed to reject proposal');
        }
      },
      error: () => {
        this.toastr.error('Error rejecting proposal');
      }
    });
  }

  // For edit modal save
  onSaveEdit() {
    if (!this.editingProposal() || this.editForm.invalid) return;
    this.store.dispatch(ProposalActions.updateProposal({
      proposalId: this.editingProposal()!.id,
      proposal: this.editForm.value
    }));
    this.toastr.success('Proposal updated');
    this.showEditModal.set(false);
  }

  searchTerm = signal<string>('');
  selectedProjectTitle = signal<string>('');
  // Compute unique project titles from proposals
  projectTitles = computed(() => {
    const all = this.proposals() || [];
    const titles = all.map(p => p.project.title);
    return Array.from(new Set(titles));
  });

  onSearchChange(value: string) {
    this.searchTerm.set(value);
  }

  onProjectFilterChange(value: string) {
    this.selectedProjectTitle.set(value);
  }

  // Filter proposals for freelancer/client, search, and project title
  filteredProposals = computed(() => {
    const u = this.user();
    let all = this.proposals() || [];
    if (!u) return [];
    if (this.userRole() === 'freelancer') {
      all = all.filter(p => p.freelancer.id === u.id);
    } else if (this.userRole() === 'client') {
      all = all.filter(p => p.project.clientId === u.id);
    }
    // Filter by project title
    if (this.selectedProjectTitle()) {
      all = all.filter(p => p.project.title === this.selectedProjectTitle());
    }
    // Filter by search term (description)
    if (this.searchTerm().trim()) {
      const term = this.searchTerm().toLowerCase();
      all = all.filter(p => p.description.toLowerCase().includes(term));
    }
    return all;
  });
}
