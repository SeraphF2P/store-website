import { FC, useState } from "react";
import { Btn, ProductCard } from "../components";
import { motion as m } from "framer-motion";
import { Portal } from "@radix-ui/react-portal";

const CardInfoOverlayer: FC<ProductType> = (product) => {
  const [showInfo, setshowInfo] = useState(false);
  return !showInfo ? (
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
      <ProductCard
        setshowInfo={() => {
          setshowInfo(!showInfo);
        }}
        {...product}
      />
      <div className=" h-8 bg-red-400">
        <Btn
          onClick={() => {
            setshowInfo(!showInfo);
          }}
        >
          click
        </Btn>
      </div>
    </m.div>
  ) : (
    <Portal className=" fixed  inset-0 flex items-center justify-center bg-slate-300/30 backdrop-blur-sm">
      <section
        className={` relative  mx-4 flex h-[540px] w-full max-w-screen-sm  justify-between border-4 border-red-500  `}
      >
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
          <ProductCard
            setshowInfo={() => {
              console.log("Asdasd");
              setshowInfo(showInfo);
            }}
            {...product}
          />
          <div className=" h-20 w-40 bg-red-400">
            <Btn
              onClick={() => {
                setshowInfo(!showInfo);
              }}
            >
              click
            </Btn>
          </div>
        </m.div>
      </section>
    </Portal>
  );
};

export default CardInfoOverlayer;
