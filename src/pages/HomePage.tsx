import { AnimatePresence, motion as m } from "framer-motion";
import CardGallery from "../components/CardGallery.tsx";
import ProductInfoSec from "../components/ProductInfoSec.tsx";
import { Categorys } from "../components/index.ts";
import { useScrollSensore } from "../hooks";
import AnimationContext from "../context/AnimationContext.tsx";
const HomePage = () => {
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
      <AnimationContext>
        <m.section
          layout
          className=" remove-scroll-bar  relative flex min-h-screen flex-wrap items-center justify-center  gap-4 overflow-y-scroll px-8 py-4"
        >
          <CardGallery />
        </m.section>
        <AnimatePresence mode="wait">
          <ProductInfoSec />
        </AnimatePresence>
      </AnimationContext>
    </main>
  );
};

export default HomePage;
