/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    const CopyPlugin = require('copy-webpack-plugin')

    config.plugins.push(
      new CopyPlugin({
        patterns: [{
          from: './node_modules/sql.js/dist/sql-wasm.wasm',
          to: 'static/sql-wasm.wasm',
        }]
      })
    )

    return config
  }
}

module.exports = nextConfig
