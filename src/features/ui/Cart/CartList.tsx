import { AnimatePresence, motion as m } from "framer-motion";
import { FC, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../../components";
import { useProducts } from "../../../context/ProductsContext";
import { useClickOutside, useScrollLock } from "../../../hook";
import { cartAnimation, slideOut } from "../../../lib/utile/animate";
import InCartItem from "./InCartItem";
import { AiOutlineShoppingCart } from "react-icons/ai";

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
        layout="position"
        transition={{
          duration: 1,
          ease: "linear",
          staggerChildren: 0.2,
          delayChildren: 0.2,
        }}
        ref={ele}
        className={`
               
                fixed right-0  top-0
     z-30  flex   h-screen w-full max-w-[400px] flex-col
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
        <m.div
          drag="y"
          dragConstraints={{
            top: 10,
            bottom: 80,
          }}
          layout="preserve-aspect"
          className=" remove-scroll-bar flex h-full w-full flex-col  gap-4   overflow-y-scroll p-4 "
        >
          <div className=" flex flex-col items-center justify-center gap-2 px-8">
            <AnimatePresence mode="popLayout">
              {inCart &&
                inCart.map((product: CartItemType) => {
                  return (
                    <m.div
                      variants={slideOut}
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      layout="position"
                      key={product.image}
                      layoutId={product.image}
                      transition={{
                        duration: 0.5,
                        ease: "easeIn",
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
