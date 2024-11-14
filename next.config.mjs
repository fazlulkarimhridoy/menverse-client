/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "backend.floralradiancebd.com",
            },
        ],
    },
};

export default nextConfig;
