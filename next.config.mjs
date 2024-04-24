import { ChildProcess } from 'child_process';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	images: {
		domains: [
			"github.com",
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
		],
	},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false, // Add this line
			net: false, // Add this line to ignore 'net'
			tls: false, // Add this line to ignore 'tls'
		child_process: false
		};
		return config;
	},
};

export default nextConfig;
