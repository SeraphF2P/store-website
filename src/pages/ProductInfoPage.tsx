import { AnimatePresence, motion as m } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Btn from "../components/Btn";
import ProductThemesGallery from "../components/ProductThemesGallery";
import axiosClient from "../lib/axiosClient";
import { fadeUp } from "../utile/animate";
import { formatCurrency } from "../utile/formatters";
import { host } from "../host";

const ProductInfoPage = () => {
	const nav = useNavigate();
	useEffect(() => {
		if (localStorage.getItem("token") == undefined) {
			nav("/access-denied");
		}
	}, [nav]);
	const { id, theme_id } = useParams();

	const { data: product } = useQuery("productinfo", () => {
		return axiosClient(`/products/${id}`);
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
					className={` relative  overflow-hidden flex h-[540px] mx-4 sm:mx-0   w-full max-w-screen-sm   rounded-md   bg-white/90 shadow-lg `}
				>
					<m.section
						layout
						className=" absolute top-40 z-10 left-0 sm:top-0  from-gray-500/90 via-gray-400/70 via-75%  to-transparent bg-gradient-to-t  sm:relative  justify-around sm:max-w-[160px] w-full sm:h-full flex  sm:flex-col "
					>
						{activeTheme && (
							<ProductThemesGallery
								themes={product?.data.themes}
								activeTheme={activeTheme}
								setactiveTheme={setactiveTheme}
							/>
						)}
					</m.section>
					<div className=" relative flex-col gap-2  flex justify-center w-full  sm:w-[calc(100%-160px)]  h-full px-8   ">
						<div className=" relative overflow-hidden flex justify-center h-60 w-full">
							<AnimatePresence mode="wait">
								{activeTheme && (
									<m.div
										initial={{ translateX: "-100%" }}
										animate={{ translateX: "0%" }}
										exit={{ translateX: "100%" }}
										transition={{ duration: 0.5, ease: "linear" }}
										key={activeTheme.image}
										className="relative h-full w-full  "
									>
										<img
											className="  -translate-x-1/2 left-1/2 top-0 max-h-full h-full object-cover absolute"
											src={host + "/storage/" + activeTheme.image}
											alt=""
										/>
									</m.div>
								)}
							</AnimatePresence>
						</div>
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
								<span className=" text-zinc-500">{activeTheme?.in_stock}</span>
							)}
						</div>
						<div className="  relative flex gap-2 ">
							<div>{formatCurrency(product?.data.price)}</div>
						</div>
						<div className="  gap-2 flex flex-col  h-40  sm:max-h-60   overflow-hidden ">
							<h3>descriptions</h3>
							<section className=" remove-scroll-bar  overflow-scroll rounded bg-gray-200/90 p-2 leading-8 ">
								<h4 className=" font-mono font-bold capitalize">
									{product?.data.name}
								</h4>
								<p>{product?.data.description}</p>
							</section>
						</div>
					</div>
				</m.div>
			</section>
		</>
	);
};
export default ProductInfoPage;
