import { FC, useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface ProductRatingProps {
	rating: number;
}

const ProductRating: FC<ProductRatingProps> = ({ rating }) => {
	const [stars, setstars] = useState<number[]>([]);
	useEffect(() => {
		const emtyArray = new Array(5);
		for (let i = 0; i < 5; i++) {
			if (i <= rating - 1) {
				emtyArray[i] = 1;
			} else {
				if (rating - i >= 0.5) {
					emtyArray[i] = 0.5;
				} else {
					emtyArray[i] = 0;
				}
			}
		}
		setstars(emtyArray);
	}, [rating]);
	return (
		<div className=" flex text-amber-300">
			{stars.map((star, index) => {
				if (star == 1) {
					return <FaStar key={index} />;
				} else if (star == 0.5) {
					return <FaStarHalfAlt key={index} />;
				} else if (star == 0) {
					return <FaRegStar key={index} />;
				}
			})}
		</div>
	);
};

export default ProductRating;
