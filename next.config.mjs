/** @type {import('next').NextConfig} */

const nextConfig = {
 images: {
    domains: ["github.com", "avatars.githubusercontent.com", "lh3.googleusercontent.com"],
 },
 webpack: (config, { isServer }) => {
    // Only add the node-loader for client-side bundles
    if (!isServer) {
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
    }

    return config;
 },
};

export default nextConfig;

