export class AddToCart {
	product_id?: number;
	quantity?: number;
}

export class DelCartItem {
	product_id?: number;
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

export class Checkout {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
	address?: string;
	order_products?: any;
}
