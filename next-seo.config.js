const defaultSEOConfig = {
  title: "Online TV Streaming Watching Party",
  titleTemplate: "%s | TVlix",
  description: "Chat and Watch Live TV Online Streaming with Others",
  openGraph: {
    type: "website",
    locale: "en_EN",
    url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    site_name: "TVlix",
  },
};

export default defaultSEOConfig;
