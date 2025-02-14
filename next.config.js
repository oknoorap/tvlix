const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");
const withOffline = require("next-offline");

const isDev = process.env.NODE_ENV === "development";
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.m3u$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "raw-loader",
        },
      ],
    });
    return config;
  },
};

const nextPlugins = [
  withOptimizedImages,
  [
    withOffline,
    {
      workboxOpts: isDev
        ? {
            generateInDevMode: false,
          }
        : {},
    },
  ],
];

module.exports = withPlugins(nextPlugins, nextConfig);
