import { AnimatePresence, motion as m } from "framer-motion";
import { FC, useRef } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../../components";
import { useProductsContext } from "../../../context/ProductsContext";
import { useClickOutside, useScrollLock } from "../../../hooks";
import { cartAnimation, cartitem } from "../../../lib/utile/animate";
import InCartItem from "./InCartItem";

interface CartListProps {
  setOpenCart: () => void;
  cartIsOpen: boolean;
}

const CartList: FC<CartListProps> = ({ setOpenCart, cartIsOpen }) => {
  const nav = useNavigate();

  const ele = useRef(null);
  const { inCart, totalPrice, clearCart } = useProductsContext();
  useClickOutside(ele, () => {
    setOpenCart();
  });
  useScrollLock(cartIsOpen);

  return (
    <m.section
      variants={cartAnimation}
      initial="hidden"
      animate="show"
      exit="hidden"
      layout
      ref={ele}
      className={`fixed right-0  top-0 z-30  flex   h-screen w-full max-w-[400px] flex-col
       bg-white/20 shadow backdrop-blur-[40px]  `}
    >
      <div className=" flex items-center justify-between px-4 py-6 backdrop-blur-[40px] ">
        <h2 className="   text-3xl  capitalize  ">shopping cart</h2>
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
      <div className=" remove-scroll-bar flex h-full w-full flex-col  gap-4   overflow-y-scroll p-4 ">
        <div className=" flex h-full w-full flex-col items-center gap-2   px-8">
          {inCart && (
            <AnimatePresence mode="popLayout" >
              {inCart.map((product: CartItemType) => {
                return (
                  <m.div
                    variants={cartitem}
                    key={product.image + product.created_at + "cartitem"}
                    exit={{
                      x: "100%",
                      opacity: 0,
                      transition: {
                        duration: 0.4,
                      },
                    }}
                    style={{ willChange: "opacity" }}
                    layout
                  >
                    <InCartItem
                      key={product.image + product.created_at + "cartitem"}
                      {...product}
                    />
                  </m.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className=" flex h-52  flex-col gap-2  p-4 backdrop-blur-[40px]">
        <p className=" m-0 capitalize">total price :{totalPrice}</p>
        <Btn
          onClick={() => nav("/check-out")}
          variant="fill"
          className="rounded p-4 capitalize"
        >
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
  );
};

export default CartList;
