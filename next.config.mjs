/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
		domains:["github.com", "avatars.githubusercontent.com", "lh3.googleusercontent.com"],
}
};
console.log("AUTH_SECRET:", process.env.AUTH_SECRET);

export default nextConfig;
