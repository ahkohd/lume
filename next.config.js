const removeImports = require('next-remove-imports')();

module.exports = removeImports({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
});
