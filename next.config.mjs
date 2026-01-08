/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    proxyPrefetch: "flexible",
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"]
    }
  },

  
  output: "standalone",
};

export default nextConfig;
