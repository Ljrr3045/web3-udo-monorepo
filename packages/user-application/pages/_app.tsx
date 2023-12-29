import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { MainLayout } from "../feautures/Layout/MainLayout";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "University of Oriente - UDOT",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>University of Oriente - UDOT</title>
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} locale="en-US">
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
