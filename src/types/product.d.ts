export declare global {
	interface ProductPropsType {
		id: string | number;
		name: string;
		seller_name: string;
		price: number;
		category:
			| "shoes"
			| "accessories"
			| "electronics"
			| "jewelrys"
			| "men's clothing"
			| "women's clothing";
		color: string;
		created_at: string;
		description: string;
		image: string;
		in_stock: number;
		rating: number;
		theme_id: string | number;
	}
}
