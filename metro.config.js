const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Expo Router'ın doğru klasörü okumasını sağla
config.resolver.extraNodeModules = {
  process: require.resolve("process"),
};

// Ortam değişkenini burada tanımla
process.env.EXPO_ROUTER_APP_ROOT = "app"; 

module.exports = config;
