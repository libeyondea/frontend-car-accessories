import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '~app/shared/models/product';
import { ProductService } from '~app/shared/services/product.service';
import { CategoryService } from '~app/shared/services/category.service';
import { Category } from '~app/shared/models/category';

@Component({
	selector: 'app-product-list-cate',
	templateUrl: './product-list-cate.component.html',
	styleUrls: ['./product-list-cate.component.scss'],
})
export class ProductListCateComponent implements OnInit {
	products: Product[] = [];
	categories: Category[] = [];

	constructor(
		private productService: ProductService,
		private categoryService: CategoryService,
		private route: ActivatedRoute,
		private router: Router
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
}
