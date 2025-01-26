import Link from "next/link";
import logoImage from "@/assets/logo.png";
import classes from "./main-header.module.css";
import Image from "next/image";
import NavLink from "./nav-link/nav-link";
import dynamic from "next/dynamic";

const MainHeaderBackground = dynamic(() =>
  import("./main-header-background/main-header-background"), 
  {
    loading: () => <p>Loading background...</p>, // Placeholder while loading
  }
);

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={logoImage}
            alt="food"
            width={40} // Adjust size as needed
            height={40}
            priority
          ></Image>
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
