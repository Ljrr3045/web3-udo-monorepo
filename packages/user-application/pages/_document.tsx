import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme="light" className="h-full">
      <Head>
        <meta
          content="Web3 Dapp of the University of Oriente - UDOT"
          name="University of Oriente - UDOT"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <body className={"h-full"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
