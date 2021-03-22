import { ChakraProvider } from "@chakra-ui/react";

import defaultTheme from "themes/default";

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
