const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withPWA = require("next-pwa");

const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  webpack: (config, options) => {
    const m3uRule = {
      test: /\.m3u/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "raw-loader",
        },
      ],
    };
    config.module.rules.push(m3uRule);
    return config;
  },
};

const nextPlugins = [
  optimizedImages,
  withPWA({
    pwa: {
      disable: isDev,
      dest: "public",
    },
  }),
];

module.exports = withPlugins([nextPlugins], nextConfig);
