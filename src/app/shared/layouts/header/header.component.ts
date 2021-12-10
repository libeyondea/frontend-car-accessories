import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Cart } from '~app/shared/models/cart';
import { Category } from '~app/shared/models/category';
import { AuthService } from '~app/shared/services/auth.service';
import { CartService } from '~app/shared/services/cart.service';
import { CategoryService } from '~app/shared/services/category.service';
import { AppState } from '~app/shared/store';
import { currentAuthRequested } from '~app/shared/store/auth/auth.actions';
import { selectCurrentAuth } from '~app/shared/store/auth/auth.selectors';
import { currentCartRequested } from '~app/shared/store/cart/cart.actions';
import { selectCurrentCart } from '~app/shared/store/cart/cart.selectors';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	currentAuth: Observable<any>;
	currentCart: Observable<any>;

	current: any = null;
	categories: Category[] = [];
	carts: Cart[] = [];

	constructor(
		private store: Store<AppState>,
		private authService: AuthService,
		private router: Router,
		private cookieService: CookieService,
		private categoryService: CategoryService,
		private cartService: CartService
	) {
		this.currentAuth = this.store.select(selectCurrentAuth);
		this.currentCart = this.store.select(selectCurrentCart);
	}

	ngOnInit(): void {
		this.categoryService.listCategories().subscribe((categories: any) => {
			if (categories.success) {
				this.categories = categories.data;
			}
		});
		this.currentAuth.subscribe((auth) => {
			console.log('auth', auth);
			this.current = auth;
		});
		this.currentAuth.subscribe((auth) => {
			if (auth) {
				this.cartService.listCarts().subscribe((carts: any) => {
					if (
						carts.success &&
						carts.data?.cartproducts &&
						carts.data.cartproducts.length > 0
					) {
						this.store.dispatch(
							currentCartRequested(carts.data.cartproducts)
						);
					}
				});
			}
		});
		this.currentCart.subscribe((carts) => {
			console.log('carts', carts);
			this.carts = carts;
		});
	}

	signout() {
		this.authService.signout().subscribe((user) => {
			console.log(user);
		});
		this.store.dispatch(currentAuthRequested(null));
		this.cookieService.delete('access_token');
		window.location.href = '/signin';
	}

	totalPrice() {
		if (this.carts && this.carts.length > 0) {
			return this.carts.reduce(function (a: any, b: any) {
				return (
					a +
					b['quantity'] *
						(b.product['price'] -
							(b.product['price'] * b.product['discount']) / 100)
				);
			}, 0);
		}
		return;
	}

	totalItemCart() {
		if (this.carts && this.carts.length > 0) {
			return this.carts.reduce(function (a: any, b: any) {
				return a + b['quantity'];
			}, 0);
		}
		return 0;
	}

	singleImage(
		images?: Array<{
			id?: number;
			name?: string;
			url?: string;
			created_at?: string;
			updated_at?: string;
		}>
	): string | undefined {
		return images && images[0]?.url;
	}

	discountTotal(price: number = 0, discount: number = 0): number {
		return price - (price * discount) / 100;
	}
}
