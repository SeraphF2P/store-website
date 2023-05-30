import { AnimatePresence, motion as m } from "framer-motion";
import { FC, useState } from "react";

import { fadeInItem, overlayer, slideIn, slideOut } from "../lib/utile/animate";
import Login from "../features/ui/regester/Login";
import SignUp from "../features/ui/regester/SignUp";

const RegesterPage: FC = () => {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-teal-300/20 via-emerald-400/20 to-green-300/20">
      <section className=" relative mx-4 h-[480px] w-full max-w-screen-md overflow-hidden rounded bg-white shadow md:mx-auto ">
        <img
          className=" absolute left-0 top-0 h-full w-full object-cover"
          src="/images/signUpBg.jpg"
          alt=""
        />
        <div className=" absolute left-0 top-0 hidden h-full w-full xs:flex  ">
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
                        className=" text-4xl capitalize text-white "
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
                        className=" text-4xl capitalize text-white "
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
              className="absolute right-0  top-0 flex h-full  w-full flex-col items-center justify-center bg-slate-300/70 xs:w-1/2 "
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
              className="absolute left-0  top-0 flex h-full  w-full flex-col items-center justify-center bg-slate-300/70 xs:w-1/2 "
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
