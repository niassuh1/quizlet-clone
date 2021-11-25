import { FC, MouseEventHandler, useEffect, useMemo, useState } from "react";
import { MdMenu, MdChevronLeft, MdLogout } from "react-icons/md";
import IconButton from "./IconButton";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "../context/Auth";
import supabase from "../util/supabase";
import getCurrentuser from "../util/getCurrentUser";

const Header: FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [username, setName] = useState("");
  const { user } = useAuthContext();
  const [beCool, setBeCool] = useState(false);

  const toggleNav: MouseEventHandler = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    if (user) {
      getCurrentuser(user)
        .then((data) => {
          setName(data.name);
        })
        .catch();
    }
  }, [user]);

  //For doing something cool
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY >= 160) {
        setBeCool(true);
      } else {
        setNavOpen(false);
        setBeCool(false);
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <header
        className={`flex px-9 py-6 items-center z-[99] md:justify-between transition-all ease-in-out duration-[250ms]  ${
          beCool
            ? "fixed w-full bg-white bg-opacity-5 backdrop-blur-md top-0 shadow-lg"
            : "-top-full"
        }`}
      >
        <IconButton
          className="md:hidden hover:bg-accent-400 active:bg-accent-500"
          Icon={MdMenu}
          onClick={toggleNav}
          size={18}
        />

        <Link href="/" passHref>
          <a className="mx-auto flex self-center items-center space-x-2 md:mx-0">
            <Image alt="logo" src="/images/logo.svg" width={32} height={32} />
            <span>Studify</span>
          </a>
        </Link>

        <Nav isOpen={navOpen}>
          <IconButton
            className="md:hidden hover:bg-accent-400 active:bg-accent-500"
            Icon={MdChevronLeft}
            onClick={toggleNav}
            size={20}
          />

          <NavItem
            className="hover:bg-accent-300 rounded-md md:hover:bg-accent-400"
            href="/"
          >
            Home
          </NavItem>

          <NavItem
            className="hover:bg-accent-300 rounded-md md:hover:bg-accent-400"
            href="/library"
          >
            Library
          </NavItem>

          <div className="flex-1 md:hidden" />

          {user ? <UserGreeting username={username} /> : <GuestGreeting />}
        </Nav>
      </header>
      {beCool && <div className="flex h-[80px]" />}
    </>
  );
};

interface NavProps {
  isOpen?: boolean;
}

/**
 * Responsive nav bar. The state of the nav bar can be controlled with useState
 * @param {NavItem} children Items inside the nav bar
 * @param {boolean} isOpen When the screen size is mobile size, then by default, the value is false
 *
 */
const Nav: FC<NavProps> = ({ children, isOpen = false }) => {
  return (
    <nav
      className={`flex fixed z-50 left-0 top-0 bg-white shadow-lg py-2 pb-20 h-screen md:h-auto transform ${
        isOpen ? "" : "-translate-x-full"
      } transition-transform ease-in-out md:relative md:bg-transparent md:shadow-none md:transform-none md:py-0`}
    >
      <ul className="flex flex-col px-4 space-y-2 md:space-x-10 md:space-y-0 md:flex-row md:relative md:items-center md:px-0">
        {children}
      </ul>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  className?: string;
}

/**
 * Item in a nav bar
 * @param {string} children The children inside the nav item
 * @param {string} href URL
 * @param {string} className
 */
const NavItem: FC<NavItemProps> = ({ children, href, className }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={`flex px-12 py-2 md:px-2  transition-colors ease-in-out duration-[250ms] ${className}`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

interface UserGreetingProps {
  username: string;
}

const UserGreeting: FC<UserGreetingProps> = ({ username }) => {
  return (
    <>
      {username && (
        <div className="flex items-start space-x-4 md:flex-row">
          <div className="flex flex-col">
            <h1 className="text-xs h-3 font-medium">Welcome,</h1>
            <span className="text-sm">{username}</span>
          </div>
          <IconButton
            className="hover:bg-transparent hover:text-green"
            Icon={MdLogout}
            onClick={async () => await supabase.auth.signOut()}
          />
        </div>
      )}
    </>
  );
};

const GuestGreeting: FC = () => {
  return (
    <>
      <NavItem
        className="hover:bg-accent-300 rounded-md md:hover:bg-accent-400"
        href="/sign-in"
      >
        Sign In
      </NavItem>

      <NavItem className="bg-primary-400 text-white rounded-md" href="/sign-up">
        Sign Up
      </NavItem>
    </>
  );
};

export default Header;
