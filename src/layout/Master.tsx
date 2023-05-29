import { FC, useEffect } from "react";
import MainNav from "../components/MainNav";
import { Outlet, useNavigate } from "react-router-dom";
import ProductsContext from "../context/ProductsContext";

const Master: FC = () => {
	// const nav = useNavigate();
	// useEffect(() => {
	// 	if (localStorage.getItem("token") == undefined) {
	// 		nav("/access-denied");
	// 	}
	// }, [nav]);
	return (
		<ProductsContext>
			<MainNav />
			
			<Outlet />
			<footer />
		</ProductsContext>
	);
};

export default Master;
