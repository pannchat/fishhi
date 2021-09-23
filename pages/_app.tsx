import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Component {...pageProps} />
      <style jsx>{`
        .app {
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
}
export default MyApp;
