import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartList from "../features/ui/Cart/CartList";
import BurgerMenu from "../features/ui/menu/BurgerMenu";
import BurgerMenuBtn from "../features/ui/menu/BurgerMenuBtn";
import { useOpenCartOrMenu } from "../hook/useOpenCartOrMenu";
import useScrollSensore from "../hook/useScrollSensore";
import Btn from "./Btn";
import { useProducts } from "../context/ProductsContext";
import SearchSec from "./SearchSec";
import * as Portal from "@radix-ui/react-portal";

const MainNav: FC = () => {
	const mainNav = useScrollSensore({
		forward: ["-translate-y-full"],
		inReverse: ["translate-y-0"],
		onHold: ["translate-y-0"],
	});
	const { cartIsOpen, menuIsOpen, setOpenCart, setOpenMenu } =
		useOpenCartOrMenu();
	const { inCart } = useProducts();
	return (
		<header
			ref={mainNav}
			className=" sticky top-0 left-0  z-20 flex   h-20 w-full bg-black/90 text-inverted transition-transform duration-1000"
		>
			<nav className=" flex h-full  w-full flex-row-reverse items-center justify-between gap-2 px-4">
				<div>
					<AnimatePresence>
						{cartIsOpen && (
							<CartList cartIsOpen={cartIsOpen} setOpenCart={setOpenCart} />
						)}
					</AnimatePresence>
					<Btn
						className={` text-white relative  cursor-pointer`}
						onClick={() => {
							setOpenCart();
						}}
					>
						<AiOutlineShoppingCart size={36} />
						{inCart.length > 0 && (
							<span className="  absolute -left-2 -bottom-2 flex items-center justify-center rounded-full bg-red-600 px-2 py-px">
								{inCart.length}
							</span>
						)}
					</Btn>
				</div>

				<SearchSec />
				<>
					<AnimatePresence>
						{menuIsOpen && (
							<BurgerMenu menuIsOpen={menuIsOpen} setOpenMenu={setOpenMenu} />
						)}
					</AnimatePresence>
					<Btn
						className={`  relative z-20 h-6 w-10 p-1 transition-transform  duration-1000 `}
						onClick={() => {
							setOpenMenu();
						}}
					>
						<BurgerMenuBtn className="h-6 w-10  " animate={menuIsOpen} />
					</Btn>
				</>
			</nav>
		</header>
	);
};

export default MainNav;
