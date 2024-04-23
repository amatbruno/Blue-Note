import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gospel",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <div>
      <script src="https://kit.fontawesome.com/612e91347a.js" crossOrigin="anonymous"></script>
      <body className={inter.className}>{children}</body>
    </div>
  );
}
