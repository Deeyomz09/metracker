import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { SiActualbudget } from "react-icons/si";
import { TbReportAnalytics, TbSettings, TbLogout } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard" },
    { title: "Transaction", icon: <AiOutlineTransaction /> },
    { title: "Categories", icon: <MdCategory /> },
    { title: "Report", icon: <TbReportAnalytics /> },
    { title: "Budget", icon: <SiActualbudget /> },
    { title: "Settings", icon: <TbSettings /> },
    { title: "Logout", icon: <TbLogout /> }
  ];

  return (
    <div className="flex">
      <div
        className={`bg-slate-700 h-screen p-5 pt-8 ${
          open ? "w-72" : "w-20"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-black text-3xl rounded-full absolute -right-3 top-9 border border-black cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <img
            src={logo}
            alt="Logo"
            className={`h-10 w-10 text-4xl rounded cursor-pointer block float-left duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />

          <h1
            className={`text-white mt-0.5 origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            METracker
          </h1>
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white/5 rounded-md mt-2"
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
