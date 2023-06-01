import { FC, useRef, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import ToggleBtn from "../components/ToggleBtn";
import { Portal } from "@radix-ui/react-portal";
import { useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Btn } from ".";
import { useProductsContext } from "../context/ProductsContext";
import { host } from "../host";
import { formatCurrency } from "../lib/utile/formatters";
import { randomNumBetween } from "../lib/utile/other";
import ProductRating from "./ProductRating";
const ProductCard: FC<ProductType> = (product) => {
  const nav = useNavigate();
  const { toggleCartItem, inCart } = useProductsContext();
  const { current: activeTheme } = useRef(
    product.themes.length == 1
      ? product.themes[0]
      : product.themes[randomNumBetween(0, product.themes.length - 1)]
  );
  const [isInfoOpen, setisInfoOpen] = useState(false);
  return (
    <div
      className={`  relative h-[356px]  w-64   overflow-hidden  rounded-lg bg-slate-50  shadow transition-shadow   hover:shadow-md `}
    >
      <div className={`${!isInfoOpen ? "card-face" : "card-back"} `}>
        <LazyLoadImage
          className="   h-40 w-64 rounded-tl-lg   rounded-tr-lg  object-cover "
          src={host + "/storage/" + activeTheme.image}
          alt={product.name}
          effect="blur"
          key={activeTheme.image}
        />

        <div className="  flex  h-[196px] w-full flex-col  items-center  justify-between gap-2 p-4     ">
          <div className="    truncate capitalize ">{product.name}</div>
          <div className="   truncate text-sm capitalize   ">
            {product.seller_name}
          </div>

          <div>{formatCurrency(+product.price)}</div>
          <ProductRating rating={product.rating} />
          {product.themes.length == 1 ? (
            <div className=" flex w-full justify-between gap-2 ">
              <Btn
                onClick={() => {
                  setisInfoOpen(!isInfoOpen);
                }}
                variant="ghost"
                className=" h-8 w-full"
              >
                more info
              </Btn>
              <ToggleBtn
                variant="outline"
                whenToggled=" text-teal-500"
                className="group h-8 w-full "
                toggleState={inCart.some(
                  (item: { id: string | number; theme_id: string | number }) =>
                    item.id == product.id && item.theme_id == activeTheme.id
                )}
                onClick={() =>
                  toggleCartItem({
                    theme_id: activeTheme.id,
                    ...activeTheme,
                    ...product,
                  })
                }
              >
                {(isToggled) => {
                  return (
                    <>
                      {isToggled ? (
                        <>added</>
                      ) : (
                        <RiAddLine
                          className="pointer-events-none fill-black group-hover:fill-blue-600 group-disabled:fill-black group-[.active]:fill-blue-400 "
                          size={24}
                        />
                      )}
                      <span className=" sr-only">add to cart</span>
                    </>
                  );
                }}
              </ToggleBtn>
            </div>
          ) : (
            <Btn
              onClick={() => {
                nav(`/products/${product.id}/${activeTheme.id}`);
              }}
              variant={"outline"}
              className=" h-8 w-full  "
            >
              check other themes
            </Btn>
          )}
        </div>
      </div>

      <div
        className={`${
          isInfoOpen ? "card-face" : " card-back"
        }   absolute inset-0 flex flex-col items-center justify-between p-4 `}
      >
        <Btn
          onClick={() => {
            setisInfoOpen(false);
          }}
          variant="ghost"
          className=" absolute left-0 top-0 p-2 text-3xl"
        >
          <BiArrowBack />
        </Btn>
        <h2>{product.category}</h2>
        <div className="  flex h-40 flex-col  gap-2  overflow-hidden   sm:max-h-60 ">
          <h3>descriptions</h3>
          <section className=" remove-scroll-bar  overflow-scroll rounded bg-gray-200/90 p-2 leading-8 ">
            <h4 className=" font-mono font-bold capitalize">{product.name}</h4>
            <p>{product.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
