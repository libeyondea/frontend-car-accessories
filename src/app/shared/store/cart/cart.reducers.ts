import { createReducer, on } from '@ngrx/store';

import * as cartActions from './cart.actions';

export const cartKey = 'cart';

export interface CartState {
	current: Array<any> | null | undefined;
}

export const initialState: CartState = {
	current: null,
};

export const cartReducer = createReducer(
	initialState,
	on(cartActions.currentCartSucceed, (state, action) => {
		return {
			...state,
			current: action.payload.current,
		};
	})
);
