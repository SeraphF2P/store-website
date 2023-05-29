import { FC } from "react";
const SearchResualtCard: FC<ProductPropsType> = (product) => {
	return (
		<div className=" bg-slate-100/90 shadow-sm cursor-pointer hover:-translate-y-2 transition-all duration-300 p-2 rounded">
			<h2>{product.name}</h2>
			<p>{product.category}</p>
		</div>
	);
};

export default SearchResualtCard;
