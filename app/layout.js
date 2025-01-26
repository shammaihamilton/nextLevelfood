import Mainheaderbackeground from "@/components/main-header/main-header-background/main-header-background";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import { ToastContainer } from "react-toastify";
export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
