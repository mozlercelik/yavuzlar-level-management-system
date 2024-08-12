import "src/styles/globals.css";
import { Inter } from "next/font/google";
import styles from "src/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return <>
    <main className={`${styles.main} ${inter.className}`}>
      <Component {...pageProps} />
    </main>
  </>
}
