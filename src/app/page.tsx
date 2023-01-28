"use client";
// import Image from "next/image";
import { Roboto } from "@next/font/google";
import Button from "@mui/material/Button";

import Header from "./components/Header";
import QuickStart from "./components/QuickStart";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <Header />
      <QuickStart />
    </main>
  );
}
