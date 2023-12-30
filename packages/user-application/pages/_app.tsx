import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { ToastContainer } from "react-toastify";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { MainLayout } from "../features/Layout/MainLayout";

/* Wagmi config */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? "" }),
    publicProvider(),
  ]
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
        <RainbowKitProvider
          locale="en-US"
          chains={chains}
          theme={lightTheme({
            accentColor: "#2563eb",
          })}
        >
          <MainLayout>
            <Component {...pageProps} />
            <ToastContainer />
          </MainLayout>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
