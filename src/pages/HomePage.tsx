import { AnimatePresence, motion as m } from "framer-motion";
import { ProductCard, Categorys } from "../components/index.ts";
import { useProductsContext } from "../context/ProductsContext.tsx";
import { useScrollSensore } from "../hooks";
import ProductInfoSec from "../components/ProductInfoSec.tsx";
const HomePage = () => {
  const { products, productInfo } = useProductsContext();
  const categorysBar = useScrollSensore({
    forward: ["-translate-y-[calc(100%+80px)]"],
    inReverse: ["translate-y-0"],
    onHold: ["translate-y-0"],
  });

  return (
    <main className=" relative">
      <section
        ref={categorysBar}
        className=" remove-scroll-bar sticky top-20 z-10 flex h-10  w-full justify-center overflow-x-scroll    bg-slate-300/80 shadow-sm transition-transform duration-1000 "
      >
        <m.div
          drag="x"
          dragConstraints={{
            left: window.screenX > 320 ? 0 : -100,
            right: -window.screenX > 320 ? 0 : 100,
          }}
          className="flex gap-1 "
        >
          <Categorys />
        </m.div>
      </section>
      <m.section
        layout
        className=" remove-scroll-bar  relative flex min-h-screen flex-wrap items-center justify-center  gap-4 overflow-y-scroll px-8 py-4"
      >
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
      </m.section>
      <AnimatePresence mode="wait">
        {productInfo && <ProductInfoSec {...productInfo} />}
      </AnimatePresence>
    </main>
  );
};

export default HomePage;
