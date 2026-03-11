import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hiram.work",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://hiram.work/en",
          es: "https://hiram.work/es",
        },
      },
    },
  ];
}
