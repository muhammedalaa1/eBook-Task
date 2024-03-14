import { Link, useLocation } from "react-router-dom";
import { Profile } from "../icons/Profile";
import { Logout } from "../icons/Logout";
import { Hamburger } from "../icons/Hamburger";
import styles from "./nav.module.scss";
import { useAuth } from "../../context/Auth";
import { useEffect, useRef, useState } from "react";

interface NavLinkProps {
  link: {
    title: string;
    path: string;
  };
}

const NavLink: React.FC<NavLinkProps> = ({ link }) => {
  const { path, title } = link;
  const currentPath = useLocation().pathname;
  return (
    <li className="hover:text-mainColor/90 transition-all duration-200">
      <Link to={path} className={`${currentPath === path && styles.active}`}>
        {title}
      </Link>
    </li>
  );
};

const Nav: React.FC = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setNavbar(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Add Your own book",
      path: "/add",
    },
  ];

  return (
    <header className="container">
      <div
        className={`py-4 flex items-center justify-between gap-3 ${
          navbar ? "sticky" : ""
        }`}
      >
        <div className="flex items-center gap-4">
          <Link to={"/"} className="font-bold whitespace-nowrap text-mainColor">
            eBook
          </Link>
        </div>

        <div className="md:hidden">
          <Hamburger
            className="md:hidden block cursor-pointer"
            onClick={() => setNavbar(true)}
          />
        </div>

        <div
          ref={navRef}
          className={`w-0 fixed h-screen top-0 right-0 transition-all duration-300 bg-[#eee] z-50 ${
            navbar ? "w-[40%] visible" : "invisible"
          }`}
        >
          <ul className="mt-12 ml-12 list-none flex flex-col gap-12 justify-center font-semibold text-[#332a47]">
            {links.map((link, index) => (
              <NavLink key={index} link={link} />
            ))}
          </ul>
          <div className="ml-12 flex flex-col justify-end h-[80%]">
            <div className="flex items-center gap-2">
              <Profile />
              <h3>{user?.userName}</h3>
              <button
                className="bg-mainColor border-2 loginBtn  border-mainColor hover:bg-white hover:text-mainColor/90 text-white rounded-md duration-300 transition-colors p-2 mt-4"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex hidden">
          <ul className="list-none flex gap-12 justify-center font-semibold text-[#332a47]">
            {links.map((link, index) => (
              <NavLink key={index} link={link} />
            ))}
          </ul>
        </div>

        <div className="justify-between items-center gap-4 md:flex hidden">
          {!user ? (
            <Link to={"/login"}>
              <button className="bg-white hover:bg-[#241441] hover:text-white transition-all duration-500 hover:transition-all hover:duration-300 rounded-full p-2 px-5 border-[#ddd] border font-medium">
                Login
              </button>
            </Link>
          ) : (
            <div
              className="mr-12 cursor-pointer"
              ref={profileRef}
              onClick={() => setOpen(!open)}
            >
              <Profile />
              {open && (
                <ul className="absolute -translate-x-2 bg-[#ddd] p-3 z-50 rounded-lg translate-y-2 ">
                  <li className="mb-3 relative">{user.userName}</li>{" "}
                  <li
                    className="flex items-center justify-center cursor-pointer"
                    onClick={logout}
                  >
                    <Logout />
                    <button>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;
