import { createAction, props } from "@ngrx/store";
import { ProposalModel, CreateProposalModel, UpdateProposalModel } from "../../Models/Proposal.model";
import { PaginationModel } from "../../Models/PaginationModel";

export const loadProposals = createAction('[Proposal] Load Proposals',
    props<{ page?: number; pageSize?: number }>()
);
export const loadProposalsSuccess = createAction('[Proposal] Load Proposals Success', 
    props<{ proposals: ProposalModel[], pagination: PaginationModel }>());
export const loadProposalsFailure = createAction('[Proposal] Load Proposals Failure', props<{ error: string }>());

export const addProposal = createAction('[Proposal] Add Proposal', props<{ proposal: CreateProposalModel }>());
export const addProposalSuccess = createAction('[Proposal] Add Proposal Success', props<{ proposal: ProposalModel }>());
export const addProposalFailure = createAction('[Proposal] Add Proposal Failure', props<{ error: string }>());

export const updateProposal = createAction('[Proposal] Update Proposal', props<{ proposalId: string, proposal: UpdateProposalModel }>());
export const updateProposalSuccess = createAction('[Proposal] Update Proposal Success', props<{ proposal: ProposalModel }>());
export const updateProposalFailure = createAction('[Proposal] Update Proposal Failure', props<{ error: string }>());

export const deleteProposal = createAction('[Proposal] Delete Proposal', props<{ proposalId: string }>());
export const deleteProposalSuccess = createAction('[Proposal] Delete Proposal Success', props<{ proposal: ProposalModel }>());
export const deleteProposalFailure = createAction('[Proposal] Delete Proposal Failure', props<{ error: string }>());
