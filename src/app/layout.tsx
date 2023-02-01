"use client";

import "./globals.css";
import { useEffect, useState, useDeferredValue } from "react";
import { usePathname, useRouter, redirect } from "next/navigation";
import { Roboto } from "@next/font/google";

import Header from "./components/Header";

import onUserStateChange from "./auth/modules/auth";
import { links } from "./data/links";
import useAuthStore from "./auth/store";
import { Unsubscribe } from "firebase/auth";
import SpinLoad from "./components/SpinLoad";
import Script from "next/script";

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
  const { setUser } = useAuthStore();
  const path = usePathname();
  const { push } = useRouter();

  const [initialized, setInitialized] = useState(false);
  const deferredInitialized = useDeferredValue(initialized);

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    (async () => {
      const onNoUser = () => {
        push(links.login.href);
        setInitialized(true);
      };

      const publicRoutes = [links.login.href, links.register.href];

      const onUser = () => {
        const isPublicRoute = publicRoutes.some((route) =>
          path?.startsWith(route)
        );

        if (isPublicRoute) {
          push(links.home.href);
        }

        setInitialized(true);
      };

      unsubscribe = await onUserStateChange({ onNoUser, setUser, onUser });
    })();

    return () => unsubscribe?.();
  }, []);

  return (
    <html lang="pt" className={roboto.className}>
      <head />
      <body>
        {!deferredInitialized ? (
          <SpinLoad fallback="Autenticando..." fullScreen={true} />
        ) : (
          <>
            {!path?.includes("login") && !path?.includes("signup") && (
              <Header />
            )}
            {children}
          </>
        )}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"
          // integrity='sha512-CeIsOAsgJnmevfCi2C7Zsyy6bQKi43utIjdA87Q0ZY84oDqnI0uwfM9+bKiIkI75lUeI00WG/+uJzOmuHlesMA=='
          // crossOrigin='anonymous'
          // referrerPolicy='no-referrer'
          strategy="beforeInteractive"
        ></Script>
      </body>
    </html>
  );
}
