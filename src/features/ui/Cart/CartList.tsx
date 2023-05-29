import { AnimatePresence, motion as m } from "framer-motion";
import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../../components";
import { useProducts } from "../../../context/ProductsContext";
import { useClickOutside, useScrollLock } from "../../../hook";
import { cartAnimation, slideOut } from "../../../utile/animate";
import InCartItem from "./InCartItem";

interface CartListProps {
	setOpenCart: () => void;
	cartIsOpen: boolean;
}

const CartList: FC<CartListProps> = ({ setOpenCart, cartIsOpen }) => {
	const nav = useNavigate();

	const ele = useRef(null);
	const { inCart, totalPrice, clearCart } = useProducts();
	useClickOutside(ele, () => {
		setOpenCart();
	});
	useScrollLock(cartIsOpen);

	return (
		<>
			<m.section
				variants={cartAnimation}
				initial="hidden"
				animate="show"
				exit="hidden"
				layout
				transition={{
					duration: 1,
					ease: "linear",
					staggerChildren: 0.2,
				}}
				ref={ele}
				className={`
                prose prose-slate 
                fixed top-0
     right-0  flex   h-screen w-full max-w-[400px] flex-col
       bg-white/20 shadow backdrop-blur-[40px]  `}
			>
				<h2 className=" bg- m-0 w-full p-6 text-3xl  capitalize backdrop-blur-[40px] ">
					shopping cart
				</h2>

				<m.div
					drag="y"
					dragConstraints={{
						top: 10,
						bottom: 80,
					}}
					className=" remove-scroll-bar h-full  w-full   overflow-y-scroll p-4 "
				>
					<div className=" flex flex-col items-center justify-center gap-2">
						<AnimatePresence>
							{inCart &&
								inCart.map((product: ProductPropsType & { qty: number }) => {
									return (
										<m.div
											variants={slideOut}
											initial={{ x: "100%", opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											exit={{ x: "100%", opacity: 0 }}
											layout
											key={product.image}
											transition={{
												duration: 0.5,
												ease: "easeIn",
											}}
											whileHover={{
												scale: 1.05,
												transition: {
													duration: 0.5,
												},
											}}
										>
											<InCartItem {...product} />
										</m.div>
									);
								})}
						</AnimatePresence>
					</div>
				</m.div>

				<div className=" flex h-52  flex-col gap-2  p-4 backdrop-blur-[40px]">
					<p className=" m-0 capitalize">total price :{totalPrice}</p>
					<Btn variant="fill" className="rounded p-4 capitalize">
						check out
					</Btn>
					<Btn
						onClick={() => {
							clearCart();
						}}
						variant="outline"
						className="rounded p-4 capitalize"
					>
						clear cart
					</Btn>
				</div>
			</m.section>
		</>
	);
};

export default CartList;
