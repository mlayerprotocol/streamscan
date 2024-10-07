/** @type {import('next').NextConfig} */
import webpack from 'webpack';
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // process: require.resolve('process/browser'),
      };
    }

    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    );

    return config;
  },
};

export default nextConfig;
