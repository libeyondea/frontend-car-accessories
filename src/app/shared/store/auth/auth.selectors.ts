import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState, authKey } from './auth.reducers';

export const selectAuth = createFeatureSelector<AuthState>(authKey);

export const selectCurrentAuth = createSelector(
	selectAuth,
	(state: AuthState) => state.current
);
