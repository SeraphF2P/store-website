export declare global {
  type ThemeType = {
    color: string;
    image: string;
    id: string | number;
  };
  type ProductType = {
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
    rating: number;
    created_at: string;
    description: string;
    themes: ThemeType[];
  };
  interface SingleProductType extends Omit<ProductType, "themes"> {
    color: string;
    image: string;
    theme_id: string | number;
  }
  interface CartItemType extends SingleProductType {
    qty: number;
  }
}
