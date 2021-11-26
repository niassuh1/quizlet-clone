import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/Auth";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
