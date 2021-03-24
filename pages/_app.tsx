import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo, LogoJsonLd } from "next-seo";

import defaultTheme from "themes/default";
import SEO from "../next-seo.config";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={defaultTheme}>
      <DefaultSeo {...SEO} />
      <LogoJsonLd
        logo={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/logo.jpg`}
        url={process.env.NEXT_PUBLIC_WEBSITE_URL}
      />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
