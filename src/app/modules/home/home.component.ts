import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { Product } from '~app/shared/models/product';
import { CartService } from '~app/shared/services/cart.service';
import { CategoryService } from '~app/shared/services/category.service';
import { ProductService } from '~app/shared/services/product.service';
import { AppState } from '~app/shared/store';
import { currentCartRequested } from '~app/shared/store/cart/cart.actions';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	products: Product[] = [];
	categories: any = [];
	isLoading: boolean = false;

	constructor(
		private store: Store<AppState>,
		private productService: ProductService,
		private categoryService: CategoryService,
		private cartService: CartService
	) {
		this.productService
			.listProducts(undefined, 4)
			.subscribe((products: any) => {
				if (products.success) {
					console.log(products);
					this.products = products.data;
				}
			});
		this.categoryService
			.listCategoriesWithProducts()
			.subscribe((categories: any) => {
				if (categories.success) {
					this.categories = categories.data;
				}
			});
	}

	discountTotal(price: number, discount: number): number {
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

	addToCartSubmit(productId: number = 0, quantity: number = 0): void {
		const payload = {
			product_id: productId,
			quantity: quantity,
		};
		this.isLoading = true;
		this.cartService
			.addToCart(payload)
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe((cart) => {
				this.store.dispatch(currentCartRequested(cart.data));
			});
	}

	ngOnInit(): void {}
}
