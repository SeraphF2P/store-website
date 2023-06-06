import { AnimatePresence, motion as m } from "framer-motion";
import { FC } from "react";
import ProductCard from "./ProductCard";
import { useProductsContext } from "../context/ProductsContext";
import { useAnimationContext } from "../context/AnimationContext";

const CardGallery: FC = () => {
  const { products } = useProductsContext();
  const { productInfo } = useAnimationContext();
  return (
    <AnimatePresence mode="popLayout">
      {products &&
        products.map((product: ProductType) => {
          return (
            productInfo?.id != product?.id && (
              <m.div
                layout="position"
                key={product.created_at + product.id + "homepage"}
                layoutId={product.created_at + product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{
                  y: -8,
                  transition: { ease: "linear", duration: 0.3 },
                }}
                transition={{ duration: 0.5 }}
              >
                <ProductCard {...product} />
              </m.div>
            )
          );
        })}
    </AnimatePresence>
  );
};

export default CardGallery;
