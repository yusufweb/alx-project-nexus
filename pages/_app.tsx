import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/Components/Layout/Header";
import "../lib/fontawesome";
import Footer from "@/Components/Layout/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
