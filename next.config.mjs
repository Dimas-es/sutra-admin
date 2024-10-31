/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337', // Sesuaikan dengan port server kamu
                pathname: '/**', // Mengizinkan semua path di localhost:1337
            },
        ],
    },
};

export default nextConfig;
