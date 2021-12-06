export class Product {
	id?: number;
	name?: string;
	slug?: string;
	price: number = 0;
	discount: number = 0;
	details?: string;
	brand?: {
		id?: number;
		name?: string;
		slug?: string;
		created_at?: string;
		updated_at?: string;
	};
	category?: {
		id?: number;
		name?: string;
		slug?: string;
		created_at?: string;
		updated_at?: string;
	};
	images?: Array<{
		id?: number;
		name?: string;
		url?: string;
		created_at?: string;
		updated_at?: string;
	}>;
	created_at?: string;
	updated_at?: string;
}
