import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // `/en` est volontairement explorable : c'est tout l'objet de la version
        // anglaise. Les hreflang de chaque page disent à Google que ce n'est pas
        // du contenu dupliqué, mais une traduction.
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
