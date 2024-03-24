/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //     serverActions: true,
    // },
    env: {
        BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
    },
};

export default nextConfig;
