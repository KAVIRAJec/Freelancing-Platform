import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProposalService } from "../../Services/proposal.service"
import { catchError, map, mergeMap, of } from "rxjs";
import * as ProposalActions from "./proposal.actions";

@Injectable()
export class ProposalEffects {
    private actions$ = inject(Actions);
    private proposalService = inject(ProposalService);

    loadProposals$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProposalActions.loadProposals),
            mergeMap(({ page, pageSize }) => 
                this.proposalService.GetAllProposals(page, pageSize).pipe(
                    map(res => {
                        if (res.success) {
                            return ProposalActions.loadProposalsSuccess({ 
                                proposals: res.data.data, 
                                pagination: res.data.pagination 
                            });
                        } else {
                            return ProposalActions.loadProposalsFailure({ error: res.errors || res.message });
                        }
                    }),
                    catchError(error => of(ProposalActions.loadProposalsFailure({ error })))
                )
            )
        )
    );

    addProposal$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ProposalActions.addProposal),
            mergeMap(({ proposal }) => 
                this.proposalService.CreateProposal(proposal).pipe(
                    map(res => {
                        if(res.success) {
                            return ProposalActions.addProposalSuccess({ proposal: res.data });
                        } else {
                            return ProposalActions.addProposalFailure({ error: res.errors || res.message });
                        }
                    }),
                    catchError(error => of(ProposalActions.addProposalFailure({ error })))
                )
            )
        )
    )

    updateProposal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProposalActions.updateProposal),
            mergeMap(({ proposalId, proposal }) =>
                this.proposalService.UpdateProposal(proposalId, proposal).pipe(
                    map(res => {
                        if (res.success) {
                            return ProposalActions.updateProposalSuccess({ proposal: res.data });
                        } else {
                            return ProposalActions.updateProposalFailure({ error: res.errors || res.message });
                        }
                    }),
                    catchError(error => of(ProposalActions.updateProposalFailure({ error })))
                )
            )
        )
    );

    deleteProposal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProposalActions.deleteProposal),
            mergeMap(({ proposalId }) =>
                this.proposalService.DeleteProposal(proposalId).pipe(
                    map(res => {
                        if (res.success) {
                            return ProposalActions.deleteProposalSuccess({ proposal: res.data });
                        } else {
                            return ProposalActions.deleteProposalFailure({ error: res.errors || res.message });
                        }
                    }),
                    catchError(error => of(ProposalActions.deleteProposalFailure({ error })))
                )
            )
        )
    );
}