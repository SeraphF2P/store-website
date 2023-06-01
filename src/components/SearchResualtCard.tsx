import { FC } from "react";
const SearchResualtCard: FC<ProductPropsType> = (product) => {
  return (
    <div className=" cursor-pointer rounded bg-slate-100/90 p-2 shadow-sm transition-all duration-300 hover:-translate-y-2">
      <h2>{product.name}</h2>
      <p>{product.category}</p>
    </div>
  );
};

export default SearchResualtCard;
