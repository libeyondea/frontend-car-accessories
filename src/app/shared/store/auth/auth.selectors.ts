import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '..';

import { AuthState, authKey } from './auth.reducers';

//export const selectAuth = createFeatureSelector<AuthState>(authKey);

export const selectAuth = (state: AppState) => state.authState;

export const selectCurrentAuth = createSelector(
	selectAuth,
	(state: AuthState) => state.current
);
