import { Outlet, useOutlet, useOutletContext } from "react-router-dom";
import MainNav from "../components/MainNav";

const Master = () => {
  const val = useOutletContext();
  return (
    <>
      <MainNav />
      <Outlet key="master.layout" context={val} />
      <footer />
    </>
  );
};

export default Master;
