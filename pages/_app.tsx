import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <footer className="my-12" />
    </>
  );
}

export default MyApp;
