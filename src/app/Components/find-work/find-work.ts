import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllProjects, selectProjectError, selectProjectLoading, selectProjectPagination } from '../../NgRx/Project/project.selector';
import * as ProjectActions from '../../NgRx/Project/project.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TimespanToReadablePipe } from '../../Pipes/timespan-to-readable.pipe';

@Component({
  selector: 'app-find-work',
  imports: [FormsModule, DatePipe, AsyncPipe, NgIf, NgFor, NgStyle, TimespanToReadablePipe],
  templateUrl: './find-work.html',
  styleUrl: './find-work.css'
})
export class FindWork implements OnInit, OnDestroy {
  projects$: any;
  pagination: any = null;
  skills: string[] = [];
  search = '';
  selectedSkill = '';
  readonly pageSize = 12;

  loading$: any;
  error$: any;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) {
    this.loading$ = this.store.select(selectProjectLoading);
    this.error$ = this.store.select(selectProjectError);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.search = params['search'];
        this.searchSubject.next(this.search);
      }
    });
    this.projects$ = this.store.select(selectAllProjects);
    this.store.select(selectProjectPagination).subscribe(pagination => {
      this.pagination = pagination;
    });
    this.projects$.subscribe((projects: any[]) => {
      if (projects && projects.length) {
        // Extract unique skills from loaded projects
        const skillSet = new Set<string>();
        projects.forEach((p: any) => {
          if (Array.isArray(p.requiredSkills)) {
            (p.requiredSkills as (any)[]).forEach((s: any) => skillSet.add(s.name));
          }
        });
        this.skills = Array.from(skillSet).sort();
      }
    });
    this.error$.subscribe((error: any) => {
      if (error) {
        let errorMessage = 'Login failed. Please try again.';
          if (error?.errors && typeof error.errors === 'object') {
            const firstKey = Object.keys(error.errors)[0];
            if (error && typeof error === 'object' && 'message' in error) {
              this.toastr.error((error as any).message, 'Error');
            } else if (firstKey && Array.isArray(error.errors[firstKey]) && error.errors[firstKey].length > 0) {
              errorMessage = error.errors[firstKey][0];
              this.toastr.error(errorMessage, 'Error');
            } 
          } else if (typeof error === 'string') {
              this.toastr.error(error, 'Error');
          }
      }
    });
    this.searchSubject.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((searchValue) => {
      this.loadPage(1, searchValue);
    });
    this.loadPage(1);
  }

  changePage(page: number): void {
    this.pagination.page = page;
    this.onFilter();
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  onFilter() {
    this.loadPage(1, this.search);
  }

  loadPage(page: number, searchOverride?: string) {
    let search = typeof searchOverride === 'string' ? searchOverride : this.search;
    if (this.selectedSkill) {
      search = this.selectedSkill;
    }
    this.store.dispatch(ProjectActions.loadProjects({
      page,
      pageSize: this.pageSize,
      search: search,
      sortBy: 'Pending'
    }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewDetails(project: any) {
    if(sessionStorage.getItem('accessToken')) {
      // Navigate to the project details page
    } else {
      this.toastr.info('Please log in to view project details.', 'Info');
    }
  }
}
