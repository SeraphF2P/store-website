import { AnimatePresence } from "framer-motion";
import { FC } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useProductsContext } from "../context/ProductsContext";
import CartList from "../features/ui/cart/CartList";
import BurgerMenu from "../features/ui/menu/BurgerMenu";
import BurgerMenuBtn from "../features/ui/menu/BurgerMenuBtn";
import { useOpenCartOrMenu } from "../hooks/useOpenCartOrMenu";
import useScrollSensore from "../hooks/useScrollSensore";
import Btn from "./Btn";
import SearchSec from "./SearchSec";

const MainNav: FC = () => {
  const mainNav = useScrollSensore({
    forward: ["-translate-y-full"],
    inReverse: ["translate-y-0"],
    onHold: ["translate-y-0"],
  });
  const { cartIsOpen, menuIsOpen, setOpenCart, setOpenMenu } =
    useOpenCartOrMenu();
  const { inCart } = useProductsContext();
  return (
    <header
      ref={mainNav}
      className=" text-inverted sticky left-0  top-0 z-20   flex h-20 w-full bg-black/90 transition-transform duration-1000"
    >
      <nav className=" flex h-full  w-full flex-row-reverse items-center justify-between gap-2 px-4">
        <div>
          <AnimatePresence >
            {cartIsOpen && (
              <CartList cartIsOpen={cartIsOpen} setOpenCart={setOpenCart} />
            )}
          </AnimatePresence>
          <Btn
            className={` relative cursor-pointer  text-white`}
            onClick={() => {
              setOpenCart();
            }}
          >
            <AiOutlineShoppingCart size={36} />
            {inCart.length > 0 && (
              <span className="  absolute -bottom-2 -left-2 flex items-center justify-center rounded-full bg-red-600 px-2 py-px">
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
