import Main from "@/components/Layouts/Main";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Main>
      <Component {...pageProps} />
    </Main>
  );
}
