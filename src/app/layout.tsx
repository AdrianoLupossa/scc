"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Roboto } from "@next/font/google";
import Header from "./components/Header";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  console.log(path);

  return (
    <html lang="pt" className={roboto.className}>
      <head />
      <body>
        {!path?.includes("login") && !path?.includes("signup") && <Header />}
        {children}
      </body>
    </html>
  );
}
