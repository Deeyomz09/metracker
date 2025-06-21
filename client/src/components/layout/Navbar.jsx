import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { SiActualbudget } from "react-icons/si";
import { TbReportAnalytics, TbSettings, TbLogout } from "react-icons/tb";
import { MdAnalytics, MdCategory } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/logo.png";

import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ open, setOpen, logout }) => {
  // const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dashboard", path: "/dashboard" },
    {
      title: "Transaction",
      icon: <AiOutlineTransaction />,
      path: "/transaction"
    },
    { title: "Analytics / Reports", icon: <MdCategory />, path: "/analytics" },
    { title: "Settings", icon: <TbSettings /> },
    { title: "Logout", icon: <TbLogout /> }
  ];

  return (
    <div
      className={` bg-slate-700 h-screen p-5 pt-8 ${
        open ? "w-80" : "w-24"
      } duration-300 fixed`}
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
          className={`h-13 w-13 rounded cursor-pointer block float-left duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />

        <h1
          className={`text-white mt-0.5 origin-left font-medium text-4xl duration-300 ${
            !open && "scale-0"
          }`}
        >
          METracker
        </h1>
      </div>
      <ul className="pt-2">
        {Menus.map((menu) => {
          const menuItem = (
            <li
              key={menu.title}
              className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-white/5 rounded-md mt-2"
              onClick={menu.title === "Logout" ? logout : undefined}
            >
              <span className="text-4xl block float-left">
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
          );

          return menu.path ? (
            <Link
              key={menu.title}
              to={menu.path}
            >
              {menuItem}
            </Link>
          ) : (
            <Fragment key={menu.title}>{menuItem}</Fragment>
          );
        })}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default connect(null, { logout })(Navbar);
