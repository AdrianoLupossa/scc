"use client";

import { Roboto } from "@next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import "./globals.css";

import Header from "./components/Header";

import { Unsubscribe } from "firebase/auth";
import Script from "next/script";
import onUserStateChange from "./auth/modules/auth";
import useAuthStore from "./auth/store";
import SpinLoad from "./components/SpinLoad";
import { links } from "./data/links";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ></Script>
      </body>
    </html>
  );
}
