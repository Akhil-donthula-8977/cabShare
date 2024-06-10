/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: { unoptimized: true },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      }
};

export default nextConfig;
