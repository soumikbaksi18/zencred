const path = require("path");

module.exports = function override(config, env) {
  // Add the resolve fallback for 'crypto'
  config.resolve.fallback = {
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
  };

  return config;
};
