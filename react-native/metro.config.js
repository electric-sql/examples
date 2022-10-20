/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('electric-sql/react-native')) {
        return {
          filePath: `${__dirname}/node_modules/electric-sql/dist/drivers/react-native-sqlite-storage/index.js`,
          type: 'sourceFile',
        };
      }

      if (moduleName.startsWith('electric-sql/react')) {
        return {
          filePath: `${__dirname}/node_modules/electric-sql/dist/frameworks/react/index.js`,
          type: 'sourceFile',
        };
      }

      // Optionally, chain to the standard Metro resolver.
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};
