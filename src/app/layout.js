import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Sharma'arke Mohamed - Full Stack Developer",
  description: "Portfolio of Sharma'arke Mohamed, Full Stack Web & Mobile Developer.",
  keywords: ["portfolio", "full stack developer", "web development", "mobile development", "Sharma'arke Mohamed"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="bg-bg-main text-text-main font-sans min-h-screen flex flex-col relative overflow-x-hidden">
        <div className="glowing-bg"></div>
        <div className="glowing-bg-2"></div>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
