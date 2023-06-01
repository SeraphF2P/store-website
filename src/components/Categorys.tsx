import { FC } from "react";
import { useQuery } from "react-query";
import axiosClient from "../lib/axiosClient";

import { useProductsContext } from "../context/ProductsContext";
import ToggleBtn from "./ToggleBtn";

interface CategorysProps {}

const Categorys: FC<CategorysProps> = () => {
  const { data: Categorys } = useQuery(
    "categorys",
    () => {
      return axiosClient.get("/products/categorys");
    },
    {
      select(data) {
        return data.data;
      },
    }
  );
  const { setCategory, activeCategory } = useProductsContext();
  return (
    Categorys &&
    Categorys.map((category: string) => {
      return (
        <ToggleBtn
          key={category}
          variant={"ghost"}
          className=" whitespace-nowrap px-2"
          onClick={({ isToggled }) => {
            if (isToggled) {
              setCategory("");
            } else {
              setCategory(category);
            }
          }}
          toggleState={activeCategory == category}
          whenToggled=" bg-teal-500"
        >
          {category}
        </ToggleBtn>
      );
    })
  );
};

export default Categorys;
