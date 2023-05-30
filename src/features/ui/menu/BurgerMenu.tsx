import { FC, useRef } from "react";
import { burgerMenuAnimation } from "../../../lib/utile/animate";
import { Link } from "react-router-dom";
import { useClickOutside, useScrollLock } from "../../../hook";
import { motion as m } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";

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
        className=" text-regular  fixed left-0  top-0 z-20 h-screen w-full max-w-[400px] divide-x-0 divide-y-2 divide-solid divide-slate-300 bg-white/20 shadow backdrop-blur-[40px]"
      >
        <div className="  flex h-2/5 w-full flex-col items-center justify-center   ">
          <Avatar className=" h-40 w-40  ">
            <AvatarImage src="https://placebeard.it/300x300" alt="@shadcn" />
            <AvatarFallback>name</AvatarFallback>
          </Avatar>
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
