import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '~app/shared/models/product';
import { ProductService } from '~app/shared/services/product.service';
import { CategoryService } from '~app/shared/services/category.service';
import { Category } from '~app/shared/models/category';
import { CartService } from '~app/shared/services/cart.service';
import { Store } from '@ngrx/store';
import { AppState } from '~app/shared/store';
import { finalize } from 'rxjs';
import { currentCartRequested } from '~app/shared/store/cart/cart.actions';
import { BrandService } from '~app/shared/services/brand.service';
import { Brand } from '~app/shared/models/brand';

@Component({
	selector: 'app-product-list-cate',
	templateUrl: './product-list-cate.component.html',
	styleUrls: ['./product-list-cate.component.scss'],
})
export class ProductListCateComponent implements OnInit {
	products: Product[] = [];
	categories: Category[] = [];
	brands: Brand[] = [];
	isLoading: boolean = false;

	constructor(
		private store: Store<AppState>,
		private productService: ProductService,
		private categoryService: CategoryService,
		private route: ActivatedRoute,
		private router: Router,
		private cartService: CartService,
		private brandService: BrandService
	) {
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get('slug');
		this.categoryService.listCategories().subscribe((categories: any) => {
			if (categories.success) {
				console.log(categories);
				this.categories = categories.data;
			}
		});
		this.brandService.listBrands().subscribe((brands: any) => {
			if (brands.success) {
				this.brands = brands.data;
			}
		});
		this.productService
			.listProducts(
				undefined,
				undefined,
				undefined,
				undefined,
				undefined,
				slug ? slug : undefined
			)
			.subscribe((products: any) => {
				if (products.success) {
					console.log(products);
					this.products = products.data;
				}
			});
	}

	addToCartSubmit(productId: number = 0, quantity: number = 0): void {
		const payload = {
			product_id: productId,
			quantity: quantity,
		};
		this.isLoading = true;
		this.cartService.addToCart(payload).subscribe((cart) => {
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
