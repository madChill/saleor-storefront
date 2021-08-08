const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (nextConfig = {}, { nextComposePlugins, phase }) => ({
  ...nextConfig,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          "sass-loader",
        ],
      },
    ];

    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        filename: "static/[name].[hash].css",
        chunkFilename: "static/[id].[hash].css",
      }),
    ];

    return typeof nextConfig.webpack === "function"
      ? nextConfig.webpack(config, options)
      : config;
  },
});
