import { FC, MouseEventHandler, useState } from "react";
import { MdMenu, MdChevronLeft } from "react-icons/md";
import IconButton from "./IconButton";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import Button from "./Button";

const Header: FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav: MouseEventHandler = () => {
    setNavOpen(!navOpen);
  };
  return (
    <header className="flex px-9 py-6 justify-between items-center z-[99]">
      <div className="flex">
        <IconButton Icon={MdMenu} onClick={toggleNav} size={18} />

        <div className="ml-4 flex self-center items-center space-x-2">
          <Image alt="logo" src="/images/logo.svg" width={25} height={25} />
          Studilet
        </div>
      </div>
      <Nav isOpen={navOpen}>
        <IconButton Icon={MdChevronLeft} onClick={toggleNav} size={20} />
        <NavItemLink href="/">Home</NavItemLink>
        <NavItemLink href="/">Workshop</NavItemLink>
        <div className="flex-1" />
        <NavItem>
          <Link passHref href="/signin">
            <a>
              <SignInButton>Sign In</SignInButton>
            </a>
          </Link>
        </NavItem>
        <NavItem>
          <Link passHref href="/signup">
            <a>
              <SignUpButton>Sign Up</SignUpButton>
            </a>
          </Link>
        </NavItem>
      </Nav>

      <div className="flex space-x-3"></div>
    </header>
  );
};

const SignInButton: FC = ({ children }) => {
  return (
    <Button className="flex px-8 py-2 text-sm transition-colors ease-in-out duration-200 rounded-full hover:bg-accent-300">
      {children}
    </Button>
  );
};

const SignUpButton: FC = ({ children }) => {
  return (
    <Button className="flex px-8 py-2 text-sm bg-primary-500 text-white rounded-full">
      {children}
    </Button>
  );
};

interface NavProps {
  isOpen?: boolean;
}

const Nav: FC<NavProps> = ({ children, isOpen = false }) => {
  return (
    <nav
      className={`flex absolute z-50 left-0 top-0 bg-white shadow-lg py-2 pb-6 h-full transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform ease-in-out`}
    >
      <ul className="flex flex-col px-2 space-y-2">{children}</ul>
    </nav>
  );
};

interface NavItemLinkProps {
  href: string;
}

const NavItemLink: FC<NavItemLinkProps> = ({ children, href }) => {
  return (
    <li>
      <Link href={href}>
        <a className="flex px-12 font-medium p-2 transition-colors ease-in-out duration-[250ms] rounded-md hover:bg-accent-300">
          {children}
        </a>
      </Link>
    </li>
  );
};

const NavItem: FC = ({ children }) => {
  return <li className="flex justify-center">{children}</li>;
};

export default Header;
