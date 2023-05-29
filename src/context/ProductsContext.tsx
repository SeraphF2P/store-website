/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, ReactNode, createContext, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useLocalStorage } from "../hook/useStorage";
import axiosClient from "../lib/axiosClient";
import { formatCurrency } from "../utile/formatters";

const Context = createContext({
	toggleCartItem: (_product: ProductPropsType) => {},
	removeFromCart: (
		_product: ProductPropsType & {
			qty: number;
		}
	) => {},
	addQty: (_id: string | number, _theme_id: string | number) => {},
	removeQty: (_id: string | number, _theme_id: string | number) => {},
	clearCart: () => {},
	setCategory: (_val: string) => {},
	activeCategory: "",
	isLoading: true,
	products: [],
	totalPrice: "",
	inCart: [],
});

export function useProducts() {
	return useContext(Context);
}

const ProductsContext: FC<{ children: ReactNode }> = (props) => {
	const {
		data,
		isLoading,
		mutate,
		variables: activeCategory,
	} = useMutation("products", {
		mutationFn: (category?: string) =>
			axiosClient(`/products?${`category=${category || ""}`}`),
	});

	const products = data?.data;

	const [inCart, setInCart] = useLocalStorage<ProductPropsType[]>("cart", []);

	const removeFromCart = (product: ProductPropsType & { qty: number }) => {
		const index = inCart.findIndex(
			(item: { id: string | number; theme_id: string | number }) => {
				return item.id == product.id && item.theme_id == product.theme_id;
			}
		);
		setInCart([...inCart.slice(0, index), ...inCart.slice(index + 1)]);
	};
	const toggleCartItem = (product: ProductPropsType) => {
		const index = inCart.findIndex(
			(item: { id: string | number; theme_id: string | number }) => {
				return item.id == product.id && item.theme_id == product.theme_id;
			}
		);
		if (index == -1) {
			setInCart((prev: ProductPropsType[]) => [
				...prev,
				{ qty: 1, ...product },
			]);
		} else {
			setInCart([...inCart.slice(0, index), ...inCart.slice(index + 1)]);
		}
	};
	const addQty = (id: string | number, theme_id: string | number) => {
		const product = inCart.find(
			(item: { id: string | number; theme_id: string | number }) =>
				item.id == id && item.theme_id == theme_id
		);
		product.qty = product.qty + 1;
		setInCart([...inCart]);
	};
	const removeQty = (id: string | number, theme_id: string | number) => {
		const product = inCart.find(
			(item: { id: string | number; theme_id: string | number }) =>
				item.id == id && item.theme_id == theme_id
		);
		if (product.qty == 1) {
			removeFromCart(product);
		} else {
			product.qty = product.qty - 1;
			setInCart([...inCart]);
		}
	};
	const totalPrice = formatCurrency(
		inCart.reduce((prev: number, curr: { price: number; qty: number }) => {
			return prev + curr.price * curr.qty;
		}, 0)
	);
	const clearCart = () => {
		setInCart([]);
	};
	const setCategory = (val = "") => {
		mutate(val);
	};
	useEffect(() => {
		setCategory();
	}, []);

	return (
		<Context.Provider
			value={{
				products,
				toggleCartItem,
				inCart,
				addQty,
				removeQty,
				removeFromCart,
				totalPrice,
				clearCart,
				isLoading,
				setCategory,
				activeCategory,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default ProductsContext;
