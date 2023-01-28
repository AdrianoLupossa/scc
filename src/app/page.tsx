"use client";
// import Image from "next/image";
import { Roboto } from "@next/font/google";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Header from "./components/Header";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className={roboto.className}>
      <Header />

      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </main>
  );
}
