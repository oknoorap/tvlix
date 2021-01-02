import { ChannelProvider } from "hooks/use-channel";

import "assets/styles/app.scss";
import "assets/styles/tailwinds.scss";

const App = ({ Component, pageProps }) => {
  return (
    <ChannelProvider>
      <Component {...pageProps} />
    </ChannelProvider>
  );
};

export default App;
