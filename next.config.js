const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/admin',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;