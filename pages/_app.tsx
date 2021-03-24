import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import defaultTheme from "themes/default";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={defaultTheme}>
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
