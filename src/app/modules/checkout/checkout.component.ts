import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';
import { Cart, Checkout } from '~app/shared/models/cart';
import { CartService } from '~app/shared/services/cart.service';
import { AppState } from '~app/shared/store';
import { currentCartRequested } from '~app/shared/store/cart/cart.actions';
import { selectCurrentCart } from '~app/shared/store/cart/cart.selectors';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
	currentCart: Observable<any>;
	carts: Cart[] = [];

	checkout: Checkout = new Checkout();
	isLoading: boolean = false;
	checkoutSuccess: boolean = false;
	errMsg: any = {};

	constructor(
		private cartService: CartService,
		private store: Store<AppState>
	) {
		this.currentCart = this.store.select(selectCurrentCart);
	}

	ngOnInit(): void {
		this.currentCart.subscribe((carts) => {
			this.carts = carts;
		});
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

	onSubmit(): void {
		const payload = {
			first_name: this.checkout.first_name,
			last_name: this.checkout.last_name,
			email: this.checkout.email,
			phone_number: this.checkout.phone_number,
			address: this.checkout.address,
			order_products: this.carts,
		};
		console.log(payload);
		if (
			!payload.first_name ||
			!payload.last_name ||
			!payload.email ||
			!payload.phone_number ||
			!payload.address
		) {
			return;
		}
		this.isLoading = true;
		this.cartService
			.checkout(payload)
			.pipe(
				finalize(() => {
					this.isLoading = false;
					this.checkoutSuccess = true;
				})
			)
			.subscribe({
				next: (v) => console.log(v),
				error: (e) => {
					console.error(e.error);
					this.errMsg = e.error.errors;
				},
				complete: () => {
					this.cartService.listCarts().subscribe((carts: any) => {
						if (carts.success) {
							this.store.dispatch(
								currentCartRequested(carts.data.cartproducts)
							);
						}
					});
				},
			});
	}
}
