const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Whether to transpile dependencies
  transpileDependencies: true,

  // Dev server configuration
  devServer: {
    // Port to run the dev server on
    port: 8080,
    // Enable hot module replacement for faster development
    hot: true,
   
    // Enable gzip compression to improve loading speed
    compress: true
  },

  // Configure the title
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Portfolio Admin Dashboard'
        return args
      })
  },

  // Chunk optimization configuration
  chainWebpack: config => {
    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        // Create a separate chunk for node_modules
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 20
        },
        // Create a separate chunk for shared code between chunks
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    });
  }
});