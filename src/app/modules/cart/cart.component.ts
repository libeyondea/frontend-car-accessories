import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { Cart } from '~app/shared/models/cart';
import { CartService } from '~app/shared/services/cart.service';
import { AppState } from '~app/shared/store';
import { currentCartRequested } from '~app/shared/store/cart/cart.actions';
import { selectCurrentCart } from '~app/shared/store/cart/cart.selectors';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
	currentCart: Observable<any>;
	isLoading: boolean = false;
	carts: Cart[] = [];

	constructor(
		private store: Store<AppState>,
		private router: Router,
		private cartService: CartService
	) {
		this.currentCart = this.store.select(selectCurrentCart);
	}

	ngOnInit(): void {
		this.currentCart.subscribe((carts) => {
			this.carts = carts;
		});
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

	totalPriceAll() {
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

	totalPriceSubAll() {
		if (this.carts && this.carts.length > 0) {
			return this.carts.reduce(function (a: any, b: any) {
				return a + b['quantity'] * b.product['price'];
			}, 0);
		}
		return;
	}

	totalPriceDisSubAll() {
		if (this.carts && this.carts.length > 0) {
			return this.carts.reduce(function (a: any, b: any) {
				return (
					a +
					((b.product['price'] * b.product['discount']) / 100) *
						b['quantity']
				);
			}, 0);
		}
		return;
	}

	priceQtyTotal(price: number = 0, qty: number = 0): number {
		return price * qty;
	}

	discountPriceQtyTotal(
		price: number = 0,
		dis: number = 0,
		qty: number = 0
	): number {
		return ((price * dis) / 100) * qty;
	}

	delCartItemSubmit(productId: number = 0): void {
		const payload = {
			product_id: productId,
		};
		this.isLoading = true;
		this.cartService.deleteCartItem(payload).subscribe((cart) => {
			console.log(cart);
			this.cartService
				.listCarts()
				.pipe(finalize(() => (this.isLoading = false)))
				.subscribe((carts: any) => {
					if (carts.success) {
						this.store.dispatch(
							currentCartRequested(carts.data.cartproducts)
						);
					}
				});
		});
	}
}
