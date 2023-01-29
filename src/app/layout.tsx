import "./globals.css";
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
  return (
    <html lang="pt" className={roboto.className}>
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
