import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '~app/shared/models/product';
import { ProductService } from '~app/shared/services/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	name: string | undefined;
	product: Product | undefined;

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService
	) {}

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
}
