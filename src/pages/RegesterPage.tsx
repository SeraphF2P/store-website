import { AnimatePresence, motion as m } from "framer-motion";
import { FC, useState } from "react";

import { fadeInItem, overlayer, slideIn, slideOut } from "../utile/animate";
import Login from "../features/ui/regester/Login";
import SignUp from "../features/ui/regester/SignUp";

const RegesterPage: FC = () => {
	const [isNewUser, setIsNewUser] = useState(false);

	return (
		<main className="h-screen bg-gradient-to-r from-teal-300/20 via-emerald-400/20 to-green-300/20 overflow-hidden flex justify-center items-center">
			<section className=" relative shadow overflow-hidden bg-white max-w-screen-md mx-4 md:mx-auto h-[480px] rounded w-full ">
				<img
					className=" absolute top-0 left-0 h-full w-full object-cover"
					src="/images/signUpBg.jpg"
					alt=""
				/>
				<div className=" hidden xs:flex absolute top-0 left-0 h-full w-full  ">
					<div className=" h-full w-1/2  ">
						<AnimatePresence>
							{isNewUser && (
								<>
									<m.div
										key="sing up"
										initial="hidden"
										animate="show"
										exit="hidden"
										variants={overlayer}
										className="hidden h-full w-full flex-col  items-center justify-center bg-gray-800/40  p-4    xsm:flex"
									>
										<div className="overflow-hidden">
											<m.h2
												variants={fadeInItem}
												className=" text-white text-4xl capitalize "
											>
												join us
											</m.h2>
										</div>
										<div className="overflow-hidden">
											<m.p variants={fadeInItem} className=" text-white">
												along with over 1milion+ user
											</m.p>
										</div>
									</m.div>
								</>
							)}
						</AnimatePresence>
					</div>
					<div className=" h-full w-1/2     ">
						<AnimatePresence initial={false}>
							{!isNewUser && (
								<>
									<m.div
										key="log in"
										initial="hidden"
										animate="show"
										exit="hidden"
										variants={overlayer}
										className="hidden h-full w-full flex-col  items-center justify-center bg-gray-800/40  p-4    xsm:flex"
									>
										<div className="overflow-hidden">
											<m.h2
												variants={fadeInItem}
												className=" text-white text-4xl capitalize "
											>
												welcome
											</m.h2>
										</div>
										<div className="overflow-hidden">
											<m.p variants={fadeInItem} className=" text-white">
												all you need and more in one place
											</m.p>
										</div>
									</m.div>
								</>
							)}
						</AnimatePresence>
					</div>
				</div>
				<AnimatePresence>
					{isNewUser && (
						<m.section
							key={"signup"}
							variants={slideIn}
							initial="hidden"
							animate="show"
							exit="hidden"
							transition={{ duration: 0.5 }}
							className="w-full h-full  bg-slate-300/70 flex flex-col  justify-center items-center xs:w-1/2 absolute top-0 right-0 "
						>
							<SignUp setIsNewUser={setIsNewUser} />
						</m.section>
					)}
				</AnimatePresence>
				<AnimatePresence initial={false}>
					{!isNewUser && (
						<m.section
							key={"login"}
							variants={slideOut}
							initial="hidden"
							animate="show"
							exit="hidden"
							transition={{ duration: 0.5 }}
							className="w-full h-full  bg-slate-300/70 flex flex-col  justify-center items-center xs:w-1/2 absolute top-0 left-0 "
						>
							<Login setIsNewUser={setIsNewUser} />
						</m.section>
					)}
				</AnimatePresence>
			</section>
		</main>
	);
};

export default RegesterPage;
