import { createReducer, on } from "@ngrx/store";
import * as ProposalActions from "./proposal.actions";
import { initialProposalState } from "./proposalState";

export const proposalReducer = createReducer(initialProposalState,
    on(ProposalActions.loadProposals, state => ({ ...state, 
        loading: true, error: null 
    })),
    on(ProposalActions.loadProposalsSuccess, (state, { proposals, pagination }) => ({
        ...state, proposals, pagination,
        loading: false, error: null
    })),
    on(ProposalActions.loadProposalsFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),

    on(ProposalActions.addProposalSuccess, (state, { proposal }) => ({
        ...state,
        proposals: [...state.proposals, proposal],
        loading: false,
        error: null
    })),
    on(ProposalActions.addProposalFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),

    on(ProposalActions.updateProposalSuccess, (state, { proposal }) => ({
        ...state,
        proposals: state.proposals.map(c => c.id === proposal.id ? proposal : c),
        loading: false,
        error: null
    })),
    on(ProposalActions.updateProposalFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),
    on(ProposalActions.deleteProposalSuccess, (state, { proposal }) => ({
        ...state,
        proposals: state.proposals.filter(c => c.id !== proposal.id),
        loading: false,
        error: null
    })),
    on(ProposalActions.deleteProposalFailure, (state, { error }) => ({
        ...state, loading: false, error
    })),
)