import { createSelector } from '@ngrx/store';
import { AppState } from '..';

import { CartState } from './cart.reducers';

export const selectCart = (state: AppState) => state.cartState;

export const selectCurrentCart = createSelector(
	selectCart,
	(state: CartState) => state.current
);
