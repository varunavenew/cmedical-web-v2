// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // config for Chrome Privacy Preserving Prefetch Proxy
        source: "/.well-known/traffic-advice",
        headers: [
          { key: "Content-Type", value: "application/trafficadvice+json" },
        ],
      },
    ];
  },
  images: {
    domains: ["cdn.sanity.io"],
  },

  async redirects() {
    return [
      {
        source: "/se/aktuellt/:path*",
        destination: "/se/nyheter",
        permanent: true,
      },
      {
        source: "/se/alla-behandlingar/:path*",
        destination: "/se/urologi",
        permanent: true,
      },
      {
        source: "/se/alla-kliniker/:path*",
        destination: "/se/kliniker",
        permanent: true,
      },
      {
        source: "/se/ansatte-sverige/:path*",
        destination: "/se/specialister",
        permanent: true,
      },
      {
        source: "/se/vara-medarbetare/:path*",
        destination: "/se/specialister",
        permanent: true,
      },
      {
        source: "/se/klinik/:path*",
        destination: "/se/kliniker",
        permanent: true,
      },
      {
        source: "/se/forsikring-se/:path*",
        destination: "/se/klinik",
        permanent: true,
      },
      {
        source: "/se/om-oss/:path*",
        destination: "/se",
        permanent: true,
      },
      {
        source: "/se/patientinformation/:path*",
        destination: "/se",
        permanent: true,
      },
      {
        source: "/se/privacy-policy-2/:path*",
        destination: "/se/privacy-policy",
        permanent: true,
      },
      {
        source: "/se/remitering/:path*",
        destination: "/se",
        permanent: true,
      },
      {
        source: "/se/uncategorized-sv/:path*",
        destination: "/se/specialister",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/no/aapenhetsloven",
        destination:
          "/files/250626%20-%20CMedical%20Redegjørelse%20åpenhetsloven%202024%20-%20signert.pdf",
      },
    ];
  },

  // Log cache hits for fetches
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

module.exports = nextConfig;
