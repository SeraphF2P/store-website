import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../context/ProductsContext";
import { host } from "../../../host";
import { Btn } from "../../../components";
import { formatCurrency } from "../../../utile/formatters";
import { BsTrash } from "react-icons/bs";
interface InCartItemProps extends ProductPropsType {
	qty: number;
}

const InCartItem: FC<InCartItemProps> = (product) => {
	const nav = useNavigate();
	const { addQty, removeQty, removeFromCart } = useProducts();
	return (
		<div
			onClick={() => {
				nav("products/" + product.id + "/" + product.theme_id);
			}}
			className={` 
                  flex  h-24 w-full cursor-pointer items-center justify-between   gap-2 overflow-hidden rounded bg-white/80 text-black shadow  `}
		>
			<div className="h-full w-24 relative  overflow-hidden   ">
				<img
					src={host + "/storage/" + product.image}
					alt="in cart product"
					className=" absolute inset-0 w-full h-full  m-0  object-cover"
				/>
			</div>
			<div className=" flex h-full w-28 prose-p:m-0  flex-col  overflow-hidden p-2 capitalize prose-p:text-clip prose-p:line-clamp-1">
				<p>{formatCurrency(product.price)}</p>
				<p>{product.name}</p>
				<p>{product.seller_name}</p>
			</div>
			<div className="flex items-center gap-2 p-2">
				<div className=" p-1">{product.qty}</div>
				<div className=" flex  w-9 flex-col justify-between gap-y-2 py-2">
					<Btn
						onClick={() => {
							addQty(product.id, product.theme_id);
						}}
						className="   h-8 w-8  rounded text-2xl shadow hover:scale-105 hover:bg-teal-400"
					>
						+
					</Btn>
					<Btn
						onClick={() => {
							removeQty(product.id, product.theme_id);
						}}
						className="   h-8 w-8  rounded text-2xl shadow hover:scale-105 hover:bg-rose-400"
					>
						-
					</Btn>
				</div>
				<Btn
					onClick={() => {
						removeFromCart(product);
					}}
					className=" px-3 py-3 hover:scale-105 hover:bg-rose-400"
				>
					<BsTrash size={24} />
					<span className=" sr-only">remove from cart</span>
				</Btn>
			</div>
		</div>
	);
};

export default InCartItem;
