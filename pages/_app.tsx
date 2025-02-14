import { useEffect } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo, LogoJsonLd } from "next-seo";

import defaultTheme from "themes/default";
import SEO from "../next-seo.config";

type DataLayer = Window &
  typeof globalThis & {
    dataLayer: any;
  };

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const w = window as DataLayer;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(["js", new Date()]);
    w.dataLayer.push(["config", "G-264RTGCSS5"]);
  }, []);

  return (
    <ChakraProvider theme={defaultTheme}>
      <DefaultSeo {...SEO} />
      <LogoJsonLd
        logo={`${process.env.NEXT_PUBLIC_WEBSITE_URL}images/logo.png`}
        url={process.env.NEXT_PUBLIC_WEBSITE_URL}
      />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/ipfs/dist/index.min.js"
        />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/orbit-db/dist/orbitdb.min.js"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
