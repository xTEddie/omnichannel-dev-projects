const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules: {
            ...require('node-libs-react-native'),
            net: require.resolve('node-libs-react-native/mock/net'),
            tls: require.resolve('node-libs-react-native/mock/tls')
        }
    }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
