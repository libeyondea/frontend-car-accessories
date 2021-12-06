import { Component, OnInit } from '@angular/core';
import { Product } from '~app/shared/models/product';
import { CategoryService } from '~app/shared/services/category.service';
import { ProductService } from '~app/shared/services/product.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	products: Product[] = [];
	categories: any = [];

	constructor(
		private productService: ProductService,
		private categoryService: CategoryService
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

	ngOnInit(): void {}
}
