/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 604800
  },
  async redirects() {
    // URLs do site PHP da agência que já estavam no ar
    return [
      { source: "/:path*.php", destination: "/:path*", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/setores/eolico", destination: "/servicos", permanent: true },
      { source: "/setores/solar", destination: "/servicos", permanent: true },
      { source: "/setores/hidrico", destination: "/servicos", permanent: true },
      {
        source: "/blog/trl-projetos-industriais",
        destination: "/blog/trl-aplicado-ao-desenvolvimento-de-projetos-industriais",
        permanent: true
      },
      {
        source: "/blog/gestao-de-risco-tecnico",
        destination: "/blog/gestao-de-risco-tecnico-em-ativos-de-energia-renovavel",
        permanent: true
      },
      {
        source: "/blog/pericia-tecnica-rastreabilidade",
        destination: "/blog/pericia-tecnica-com-foco-em-rastreabilidade-de-evidencias",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow"
          }
        ]
      },
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|avif|svg|mp4)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=31536000"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
