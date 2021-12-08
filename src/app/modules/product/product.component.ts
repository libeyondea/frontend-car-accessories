import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { Product } from '~app/shared/models/product';
import { CartService } from '~app/shared/services/cart.service';
import { ProductService } from '~app/shared/services/product.service';
import { AppState } from '~app/shared/store';
import { currentCartRequested } from '~app/shared/store/cart/cart.actions';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	name: string | undefined;
	product: Product | undefined;
	isLoading: boolean = false;

	listQuantity: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	quantity: number = this.listQuantity[0];

	constructor(
		private store: Store<AppState>,
		private route: ActivatedRoute,
		private productService: ProductService,
		private cartService: CartService
	) {}

	onChangeQuantity(event: any) {
		this.quantity = event.target.value;
	}

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get('slug');
		this.productService.singleProduct(slug).subscribe((product: any) => {
			if (product.success) {
				console.log(product);
				this.product = product.data;
			}
		});
	}

	discountTotal(price: number = 0, discount: number = 0): number {
		return price - (price * discount) / 100;
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

	changeImage(obj: any): void {
		const el = document.getElementById('current');
		const imgs = document.querySelectorAll('.img');
		if (el) {
			el.setAttribute('src', obj.target.attributes.src.value);
			if (imgs) {
				imgs.forEach((img: any) => {
					img.style.opacity = 1;
				});
			}
			obj.target.style.opacity = 0.6;
		}
	}

	addToCartSubmit(productId: number = 0): void {
		const payload = {
			product_id: productId,
			quantity: Number(this.quantity),
		};
		this.isLoading = true;
		this.cartService
			.addToCart(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((cart) => {
				this.store.dispatch(currentCartRequested(cart.data));
			});
	}
}
