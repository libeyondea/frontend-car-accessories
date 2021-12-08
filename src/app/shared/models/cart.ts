export class AddToCart {
	product_id?: number;
	quantity?: number;
}

export class Cart {
	id?: number;
	cart_id?: number;
	product_id?: number;
	quantity?: number;
	created_at?: string;
	updated_at?: string;
	product?: any;
}
