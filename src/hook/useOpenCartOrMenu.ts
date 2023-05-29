import { useState } from "react";

export function useOpenCartOrMenu() {
	const [cart, setCart] = useState(false);
	const [menu, setMenu] = useState(false);
	const setOpenCart = () => {
		if (!cart && menu) {
			setMenu(false);
		}
		setCart(!cart);
	};
	const setOpenMenu = () => {
		if (cart && !menu) {
			setCart(false);
		}
		setMenu(!menu);
	};

	return { cartIsOpen: cart, menuIsOpen: menu, setOpenCart, setOpenMenu };
}
