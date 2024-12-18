

import Link from "next/link";
import logoImage from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import Mainheaderbackeground from "./main-header-background/main-header-background";
import NavLink from "./nav-link/nav-link";
export default function MainHeader() {
  return (
    <>
      <Mainheaderbackeground />

      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImage} alt="food" priority></Image>
          NextLevel food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
