
import Categorys from "../components/Categorys.tsx";
import ProductCard from "../components/ProductCard.tsx";
import { useProductsContext } from "../context/ProductsContext.tsx";
import useScrollSensore from "../hook/useScrollSensore.ts";
import { AnimatePresence, motion as m } from "framer-motion";
const HomePage = () => {
  const { products } = useProductsContext();
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
        <AnimatePresence>
          {products &&
            products.map((product: ProductType) => {
              return (
                <m.div
                  layout
                  key={product.created_at + "homepagecard"}
                  layoutId={product.created_at + product.id + "homepagecard"}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8, transition: { ease: "linear" } }}
                >
                  <ProductCard {...product} />
                </m.div>
              );
            })}
        </AnimatePresence>
      </m.section>
    </main>
  );
};

export default HomePage;
