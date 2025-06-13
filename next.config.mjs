/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict mode which can cause issues with map libraries that rely on initialization once
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    
    // Handle AntV L7 specific requirements
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    // Avoid issues with specific AntV dependencies in production
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    return config;
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
