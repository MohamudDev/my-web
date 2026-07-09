import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Interactive Score Board",
  description: "A premium two-team calculator-style scoreboard web application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="font-sans min-h-screen flex flex-col relative overflow-x-hidden">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
