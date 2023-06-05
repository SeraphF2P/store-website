import { AnimatePresence, motion as m } from "framer-motion";
import { FC } from "react";
import { host } from "../host";

interface ProductThemesGalleryProps {
  themes: any;
  activeTheme: any;
  setactiveTheme: any;
}

const ProductThemesGallery: FC<ProductThemesGalleryProps> = ({
  themes,
  activeTheme,
  setactiveTheme,
}) => {
  return (
    <AnimatePresence initial={false}>
      {themes &&
        themes.map((theme: { id: string; image: string }) => {
          return theme.id != activeTheme.id ? (
            <m.div
              key={theme.image + "gallery"}
              onClick={() => setactiveTheme(theme.id)}
              className={` relative h-24 w-20 overflow-hidden  rounded-sm object-cover sm:w-40 `}
            >
              <img
                className={`absolute inset-0 top-1/2 w-full max-w-full -translate-y-1/2 object-cover`}
                src={host + "/storage/" + theme.image}
                alt="product image"
              />
            </m.div>
          ) : (
            <m.div
              key={theme.image + "gallery"}
              className={` relative order-1 h-24 w-20 overflow-hidden  rounded-sm object-cover sm:w-40  `}
            >
              <img
                className={`absolute inset-0  top-1/2 w-full max-w-full -translate-y-1/2 object-cover`}
                src={host + "/storage/" + theme.image}
                alt="product image"
              />
            </m.div>
          );
        })}
    </AnimatePresence>
  );
};

export default ProductThemesGallery;
