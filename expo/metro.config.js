const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith("electric-sql/expo")) {
    return {
      filePath: `${__dirname}/node_modules/electric-sql/dist/drivers/expo-sqlite/index.js`,
      type: "sourceFile",
    };
  }

  if (moduleName.startsWith("electric-sql/react")) {
    return {
      filePath: `${__dirname}/node_modules/electric-sql/dist/frameworks/react/index.js`,
      type: "sourceFile",
    };
  }

  // Optionally, chain to the standard Metro resolver.
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
