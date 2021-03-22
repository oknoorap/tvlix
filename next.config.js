const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.m3u/,
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

const nextPlugins = [optimizedImages];

module.exports = withPlugins([nextPlugins], nextConfig);
