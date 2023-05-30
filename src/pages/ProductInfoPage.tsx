import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Btn from "../components/Btn";
import ProductThemesGallery from "../components/ProductThemesGallery";
import axiosClient from "../lib/axiosClient";
import { fadeUp } from "../lib/utile/animate";
import { formatCurrency } from "../lib/utile/formatters";
import { host } from "../host";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ProductInfoPage = () => {
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      nav("/access-denied");
    }
  }, [nav]);
  const { id, theme_id } = useParams();
  const { data: product } = useQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return axiosClient(`/products/${id}`);
    },
  });
  const [activeTheme, setTheme] = useState(
    product?.data.themes.find((item: { id: string | undefined }) => {
      return item.id === theme_id;
    })
  );
  const setactiveTheme = (id: string | undefined) => {
    const index = product?.data.themes.findIndex(
      (t: { id: string }) => t.id == id
    );
    setTheme(product?.data.themes[index]);
  };
  useEffect(() => {
    setactiveTheme(theme_id);
  }, [product?.data.themes, theme_id]);
  return (
    <>
      <section
        className={`flex     h-screen  w-screen items-center justify-center bg-opacity-20`}
      >
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className={` relative  mx-4 flex  h-[540px] w-full max-w-screen-sm   overflow-hidden rounded-md   bg-slate-50/90   shadow-lg sm:mx-0 `}
        >
          <m.section
            layout
            className=" absolute  left-0 top-40 z-10 flex w-full justify-around bg-gradient-to-t  from-slate-50 via-slate-50 via-10%  to-transparent sm:relative  sm:top-0  sm:h-full sm:max-w-[160px] sm:flex-col-reverse sm:from-transparent   "
          >
            {activeTheme && (
              <ProductThemesGallery
                themes={product?.data.themes}
                activeTheme={activeTheme}
                setactiveTheme={setactiveTheme}
              />
            )}
          </m.section>
          <div className="relative flex h-full w-full  flex-col gap-2 sm:w-[calc(100%-160px)]  sm:justify-center   sm:shadow   ">
            <div className=" relative h-60 w-full overflow-hidden   ">
              <AnimatePresence mode="popLayout">
                {activeTheme && (
                  <m.div
                    initial={{ translateX: "-100%" }}
                    animate={{ translateX: "0%" }}
                    exit={{ translateX: "100%" }}
                    transition={{ duration: 1, ease: "linear" }}
                    key={activeTheme.image}
                    layout="position"
                    className="relative h-60 w-full   "
                  >
                    <img
                      className="h-60 w-full  object-cover "
                      src={host + "/storage/" + activeTheme.image}
                      alt=""
                    />
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <div className=" flex flex-col gap-2 p-2">
              <div className="  flex items-center  justify-between ">
                <div className=" max-w-[50%]   capitalize ">
                  {product?.data.seller_name}
                </div>
                <Btn variant="fill" className={`px-4 py-2  capitalize `}>
                  order now
                </Btn>
              </div>
              <div className="  capitalize">
                on stack :
                {product?.data.themes && (
                  <span className=" text-zinc-500">
                    {activeTheme?.in_stock}
                  </span>
                )}
              </div>
              <div className="  relative flex gap-2 ">
                <div>{formatCurrency(product?.data.price)}</div>
              </div>
              <div className="  flex h-40 flex-col  gap-2  overflow-hidden   sm:max-h-60 ">
                <h3>descriptions</h3>
                <section className=" remove-scroll-bar  overflow-scroll rounded bg-gray-200/90 p-2 leading-8 ">
                  <h4 className=" font-mono font-bold capitalize">
                    {product?.data.name}
                  </h4>
                  <p>{product?.data.description}</p>
                </section>
              </div>
            </div>
          </div>
        </m.div>
      </section>
    </>
  );
};
export default ProductInfoPage;
