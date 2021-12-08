import { authReducer, AuthState } from './auth/auth.reducers';
import { AuthEffects } from './auth/auth.effects';
import { CartEffects } from './cart/cart.effects';
import { cartReducer, CartState } from './cart/cart.reducers';

export interface AppState {
	authState: AuthState;
	cartState: CartState;
}

export const appReducers = {
	authState: authReducer,
	cartState: cartReducer,
};

export const appEffects = [AuthEffects, CartEffects];
