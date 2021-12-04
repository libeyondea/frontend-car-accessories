import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	name: string | undefined;
	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get('slug');

		console.log(slug);
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
