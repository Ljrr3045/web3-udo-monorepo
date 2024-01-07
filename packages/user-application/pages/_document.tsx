import Script from "next/script";
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
        <link rel="manifest" href="/manifest.json" />
        <Script
          src="/assets/scripts/lang-config.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </Head>
      <body className={"h-full"}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
