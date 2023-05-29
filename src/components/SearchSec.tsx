import { BiSearchAlt } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import Btn from "../components/Btn";
import axiosClient from "../lib/axiosClient";
import SearchResualtCard from "./SearchResualtCard";
import { AnimatePresence, motion as m } from "framer-motion";
import { fadeUp } from "../utile/animate";
export default function SearchSec() {
	const ctx = useQueryClient();

	const searchHandeler = async (name: string) => {
		if (name) {
			return await axiosClient(`/products?search=${name}&limit=5`);
		}
		await ctx.invalidateQueries("search");
	};
	const { mutate, data: result } = useMutation({
		mutationKey: "search",
		mutationFn: searchHandeler,
	});

	return (
		<section className=" relative flex items-center justify-center flex-col ">
			<div className=" flex w-[196px] items-center justify-between xsm:w-64 sm:w-72">
				<input
					placeholder="search"
					type="text"
					onChange={(e) => {
						mutate(e.target.value);
					}}
					className=" w-full rounded-tl-sm rounded-bl-sm"
				/>
				<Btn
					aria-label="search bar button"
					className=" bg-black  shadow-white/25 rounded-tr-sm rounded-br-sm shadow-inner"
				>
					<BiSearchAlt color="white" size={40} />
				</Btn>
			</div>
			<AnimatePresence>
				{result && (
					<m.div
						variants={fadeUp}
						initial="hidden"
						animate="show"
						exit="hidden"
						transition={{ duration: 0.4, ease: "linear", staggerChildren: 0.2 }}
						className=" absolute flex gap-2 flex-col -left-4  top-[calc(100%+64px)] w-[calc(100%+16px)] min-h-4"
					>
						<AnimatePresence>
							{result.data.map((product: ProductPropsType) => {
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
