import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import Btn from "../components/Btn";
import axiosClient from "../lib/axiosClient";
import { fadeUp } from "../lib/utile/animate";
import SearchResualtCard from "./SearchResualtCard";
export default function SearchSec() {
  const searchHandeler = async (name: string) => {
    if (name) {
      return await axiosClient(`/products?search=${name}&limit=5`);
    }
  };
  const [searchFor, setSearchFor] = useState("");
  const { data: result } = useQuery({
    queryKey: ["products", searchFor],
    queryFn: () => {
      searchHandeler(searchFor);
    },
    // select: (data) => {
    //   return data.data;
    // },
  });

  return (
    <section className=" relative flex flex-col items-center justify-center ">
      <div className=" flex w-[196px] items-center justify-between xsm:w-64 sm:w-72">
        <input
          placeholder="search"
          type="text"
          onChange={(e) => {
            setSearchFor(e.target.value);
          }}
          className=" w-full rounded-bl-sm rounded-tl-sm"
        />
        <Btn
          aria-label="search bar button"
          className=" rounded-br-sm  rounded-tr-sm bg-black shadow-inner shadow-white/25"
        >
          <BiSearchAlt color="white" size={40} />
        </Btn>
      </div>
      <AnimatePresence>
        {result?.data && (
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.4, ease: "linear", staggerChildren: 0.2 }}
            className=" min-h-4 absolute -left-4 top-[calc(100%+64px)] flex  w-[calc(100%+16px)] flex-col gap-2"
          >
            <AnimatePresence>
              {result?.data.map((product: SingleProductType) => {
                return (
                  <m.div variants={fadeUp} key={product.image}>
                    <SearchResualtCard {...product} />
                  </m.div>
                );
              })}
            </AnimatePresence>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
