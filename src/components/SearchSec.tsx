import { AnimatePresence, motion as m } from "framer-motion";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import Btn from "../components/Btn";
import axiosClient from "../lib/axiosClient";
import { searchItem, searchResualts } from "../lib/utile/animate";
import SearchResualtCard from "./SearchResualtCard";
export default function SearchSec() {
  const [searchFor, setSearchFor] = useState("");
  const { data: result } = useQuery({
    queryKey: ["search", searchFor],
    queryFn: () => {
      if (searchFor) {
        return axiosClient(`/products?search=${searchFor}&limit=5`);
      }
    },
    select: (data) => {
      return data?.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60,
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

      {result && (
        <m.div
          variants={searchResualts}
          initial="hidden"
          animate="show"
          exit="hidden"
          layout
          className="  absolute  -left-4 top-[calc(100%+64px)] flex  w-[calc(100%+16px)] flex-col gap-2"
        >
          <AnimatePresence mode="popLayout">
            {result.map((product: SingleProductType) => {
              return (
                <m.div
                  layout
                  variants={searchItem}
                  key={product.image + "search"}
                  style={{ willChange: "opacity" }}
                >
                  <SearchResualtCard {...product} />
                </m.div>
              );
            })}
          </AnimatePresence>
        </m.div>
      )}
    </section>
  );
}
