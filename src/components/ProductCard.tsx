import { FC } from "react";
import { RiAddLine } from "react-icons/ri";
import ToggleBtn from "../components/ToggleBtn";

import { useNavigate } from "react-router-dom";

import { motion as m } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useProducts } from "../context/ProductsContext";
import { host } from "../host";
import { formatCurrency } from "../utile/formatters";
import ProductRating from "./ProductRating";
const ProductCard: FC<ProductPropsType> = (product) => {
	const nav = useNavigate();
	const { toggleCartItem, inCart } = useProducts();
	return (
		<m.div
			layout
			initial={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			whileHover={{ y: -8, transition: { ease: "linear" } }}
			onClick={() => {
				nav("/products/" + product.id + "/" + product.theme_id);
			}}
			className={`
              relative h-[356px]   w-64 cursor-pointer hover:shadow-md transition-shadow  rounded-lg bg-slate-50   shadow-sm`}
		>
			<>
				<LazyLoadImage
					className=" relative w-full h-40   rounded-tr-lg  rounded-tl-lg "
					src={host + "/storage/" + product.image}
					alt="product"
					effect="blur"
					key={product.image}
				/>

				<div className="  flex  h-[196px] w-full justify-center  items-center  flex-col gap-4 p-2     ">
					<div className="    truncate capitalize ">{product.name}</div>
					<div className="   truncate text-sm capitalize   ">
						{product.seller_name}
					</div>

					<div>{formatCurrency(+product.price)}</div>
					<ProductRating rating={product.rating} />
					<ToggleBtn
						variant="outline"
						whenToggled=" text-teal-500"
						className="group w-full h-8 "
						toggleState={inCart.some(
							(item: { id: string | number; theme_id: string | number }) =>
								item.id == product.id && item.theme_id == product.theme_id
						)}
						onClick={() => toggleCartItem(product)}
					>
						{(isToggled) => {
							return (
								<>
									{isToggled ? (
										<>added</>
									) : (
										<RiAddLine
											className="pointer-events-none fill-black group-hover:fill-blue-600 group-disabled:fill-black group-[.active]:fill-blue-400 "
											size={24}
										/>
									)}
									<span className=" sr-only">add to cart</span>
								</>
							);
						}}
					</ToggleBtn>
				</div>
			</>
		</m.div>
	);
};
export default ProductCard;
