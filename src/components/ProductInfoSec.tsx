import { Portal } from "@radix-ui/react-portal";
import { motion as m } from "framer-motion";

import { useAnimationContext } from "../context/AnimationContext";
import { useScrollLock } from "../hooks";
import ProductCard from "./ProductCard";

const ProductInfoSec = () => {
  const { productInfo: product } = useAnimationContext();
  useScrollLock(product != null);
  return product ? (
    <Portal asChild>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5 },
        }}
        style={{ willChange: "opacity" }}
        layout
        className="fixed inset-0 z-30 flex items-center justify-center  bg-slate-800/30 backdrop-blur-sm "
      >
        <m.section
          layout
          className={` relative mx-4  flex h-[540px] w-full  max-w-screen-sm items-center justify-center   `}
        >
          <m.div
            layout="position"
            key={product.created_at + product.id + "info"}
            layoutId={product.created_at + product.id}
            className={` relative  h-[356px]`}
          >
            <m.div
              className={` absolute inset-0  `}
              initial={{ x: "0%" }}
              animate={{
                x: "-50%",
                transition: { duration: 0.5, delay: 0.6 },
              }}
              exit={{ x: "0%", transition: { duration: 0.5, delay: 0.6 } }}
            >
              <div className=" prose h-full p-4   text-center">
                <h2 className=" border-b-4 border-yellow-300 pb-2 ">
                  {product.name}
                </h2>

                <p className=" remove-scroll-bar  h-60 overflow-y-scroll ">
                  {product.description}
                  dddddddddd dddddddd ddddd dddddddddd ddddddddddd dddddddd
                  ddddddddddd dddddddd dddddddddddd ddddddddddddd dddddddd
                  ddddddddd ddddddd ddddddddd dddddd dddddddd
                </p>
              </div>
            </m.div>
            <m.div
              className={` h-[356px] `}
              initial={{ x: "0%" }}
              animate={{
                x: "50%",
                transition: { duration: 0.5, delay: 0.6 },
              }}
              exit={{ x: "0%", transition: { duration: 0.5, delay: 0.6 } }}
            >
              <ProductCard {...product} />
            </m.div>
          </m.div>
        </m.section>
      </m.section>
    </Portal>
  ) : null;
};

export default ProductInfoSec;
