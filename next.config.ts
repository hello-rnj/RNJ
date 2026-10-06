import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  /* `/projets` et `/services/analyse-institutionnelle` rendaient le meme
     composant sous deux URL : deux pages quasi identiques qui se disputaient
     les memes requetes. Elles sont fusionnees dans `/expertises`.
     Redirections PERMANENTES : c'est ce qui transfere l'anteriorite des
     anciennes URL vers la nouvelle. Une 302 ne transfere rien et laisse les
     deux anciennes adresses indexees. A conserver indefiniment — des liens
     externes et des signets pointent encore vers `/projets`. */
  async redirects() {
    return [
      /* `statusCode: 301` plutot que `permanent: true`, qui fait emettre un 308
         a Next. Google traite les deux a l'identique, mais 301 est le code que
         tout crawler et tout outil d'audit reconnait sans reserve. */
      { source: '/projets', destination: '/expertises', statusCode: 301 },
      {
        source: '/services/analyse-institutionnelle',
        destination: '/expertises',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
