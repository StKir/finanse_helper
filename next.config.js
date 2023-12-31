/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['lh3.googleusercontent.com', '*.*.*', 'static.mk.ru'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: '',
				pathname: '*'
			}
		]
	}
};

module.exports = nextConfig;
