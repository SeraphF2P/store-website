import { FC, useRef } from "react";
import { burgerMenuAnimation } from "../../../utile/animate";
import { Link } from "react-router-dom";
import { useClickOutside, useScrollLock } from "../../../hook";
import { motion as m } from "framer-motion";

interface BurgerMenuProps {
	menuIsOpen: boolean;
	setOpenMenu: () => void;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ menuIsOpen, setOpenMenu }) => {
	const ele = useRef(null);
	useClickOutside(ele, () => {
		setOpenMenu();
	});
	useScrollLock(menuIsOpen);

	return (
		<>
			<m.section
				variants={burgerMenuAnimation}
				initial="close"
				animate="open"
				exit="close"
				transition={{ duration: 1, ease: "linear" }}
				ref={ele}
				className=" fixed  top-0  left-0 h-screen w-full max-w-[400px] divide-y-2 divide-x-0 divide-solid divide-slate-300 bg-white/20 text-regular shadow backdrop-blur-[40px]"
			>
				<div className="  flex h-2/5 w-full flex-col items-center justify-center   ">
					<div className=" h-40 w-40 overflow-hidden rounded-full shadow">
						<img
							className=" h-full w-full object-cover"
							src="https://picsum.photos/300/300/"
							alt="user profile photo"
						/>
					</div>
					<h2>name</h2>
				</div>
				{/* {isAdmain ? <AddCategores /> : ""}
				<div className=" flex items-center justify-center">
					<AddProductSec />
				</div> */}

				<ul className=" flex h-3/5 flex-col items-center p-4 ">
					<li key="list item 1" className=" text-3xl capitalize">
						<Link to="/">wishlist</Link>
					</li>
					<li key="list item 2" className=" text-3xl capitalize">
						<Link to="/">placeholder</Link>
					</li>
					<li key="list item 3" className=" text-3xl capitalize">
						<Link to="/">placeholder</Link>
					</li>
					<li key="list item 4" className=" text-3xl capitalize">
						<Link to="/">placeholder</Link>
					</li>
					<li key="list item 5" className=" text-3xl capitalize">
						<Link to="/">placeholder</Link>
					</li>
				</ul>
			</m.section>
		</>
	);
};

export default BurgerMenu;
