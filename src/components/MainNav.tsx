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
			className=" sticky top-0 left-0  z-50 flex   h-20 w-full bg-black/90 text-inverted transition-transform duration-1000"
		>
			<nav className="  flex h-full  w-full flex-row-reverse items-center justify-between gap-2 px-4">
				<Btn
					className={`${
						menuIsOpen ? "z-0" : "z-50"
					} text-white relative cursor-pointer`}
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
				<SearchSec />
				<BurgerMenuBtn
					menuIsOpen={menuIsOpen}
					setOpenMenu={setOpenMenu}
					className={`${cartIsOpen ? "z-0" : "z-50"} ${
						menuIsOpen && "rotate-90"
					}`}
				/>
			</nav>
			<AnimatePresence>
				{cartIsOpen && (
					<CartList cartIsOpen={cartIsOpen} setOpenCart={setOpenCart} />
				)}
			</AnimatePresence>
			<AnimatePresence>
				{menuIsOpen && (
					<BurgerMenu menuIsOpen={menuIsOpen} setOpenMenu={setOpenMenu} />
				)}
			</AnimatePresence>
		</header>
	);
};

export default MainNav;
