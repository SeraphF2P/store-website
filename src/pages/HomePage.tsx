import Categorys from "../components/Categorys.tsx";
import ProductCard from "../components/ProductCard.tsx";
import { useProducts } from "../context/ProductsContext.tsx";
import useScrollSensore from "../hook/useScrollSensore.ts";
import { motion as m } from "framer-motion";
const HomePage = () => {
	const { products } = useProducts();
	const categorysBar = useScrollSensore({
		forward: ["-translate-y-[calc(100%+80px)]"],
		inReverse: ["translate-y-0"],
		onHold: ["translate-y-0"],
	});

	return (
		<main className=" relative">
			<section
				ref={categorysBar}
				className=" flex justify-center overflow-x-scroll remove-scroll-bar transition-transform  duration-1000 sticky top-20 z-40   w-full bg-slate-300/80 shadow-sm h-10 "
			>
				<m.div
					drag="x"
					dragConstraints={{
						left: window.screenY / 2,
						right: -window.screenY / 2,
					}}
					className="flex gap-1 "
				>
					<Categorys />
				</m.div>
			</section>
			<m.section
				layout
				className=" relative  remove-scroll-bar flex min-h-screen overflow-y-scroll flex-wrap gap-4  px-8 py-4 justify-center items-center"
			>
				{products &&
					products.map((product: ProductPropsType) => {
						return (
							<ProductCard
								key={product.id + "theme" + product.theme_id}
								{...product}
							/>
						);
					})}
			</m.section>
		</main>
	);
};

export default HomePage;
