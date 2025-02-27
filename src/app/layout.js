"use client";

import "./globals.css";
import Head from 'next/head'
import Nav from "./components/nav"
import Footer from "./components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
          <title>Home Page</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=open_in_full" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
          <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
      </Head>
      <body>
        <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
