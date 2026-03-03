import type { Metadata } from "next";

import { contactInfo } from "@/lib/data";

const DEFAULT_SITE_URL = "https://fmea-engineering.vercel.app";
const DEFAULT_OG_IMAGE = "/hero-energia.png";

export const siteConfig = {
  name: "FMEA Engineering",
  legalName: "FMEA Engineering",
  description:
    "Engenharia aplicada para análise de falha, inspeção técnica, perícia técnica e caracterização de materiais em ativos críticos.",
  locale: "pt_BR",
  defaultOgImage: DEFAULT_OG_IMAGE,
  city: "Florianópolis",
  region: "SC",
  country: "BR",
  email: contactInfo.email,
  phone: contactInfo.phone,
  whatsapp: contactInfo.whatsapp,
  office: contactInfo.office,
  coverage: contactInfo.coverage,
  socialLinks: [
    "https://www.linkedin.com/company/fmea-engineering/",
    "https://www.instagram.com/fmeaengineering/"
  ]
} as const;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

function normalizeSiteUrl(rawUrl?: string) {
  const value = rawUrl?.trim();
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL);
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime
}: CreateMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    keywords,
    alternates: {
      canonical
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: imageUrl,
          alt: imageAlt ?? title,
          width: 1200,
          height: 630
        }
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
          }
        }
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EngineeringService",
    "@id": `${absoluteUrl("/")}#engineering-service`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: "BR",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country
    },
    sameAs: siteConfig.socialLinks,
    image: absoluteUrl(siteConfig.defaultOgImage)
  };
}

export function createLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${absoluteUrl("/")}#local-business`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: "BR",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country
    },
    image: absoluteUrl(siteConfig.defaultOgImage)
  };
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "pt-BR",
    publisher: {
      "@id": `${absoluteUrl("/")}#engineering-service`
    }
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

type ServiceSchemaInput = {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  keywords: string[];
  image?: string;
};

export function createServiceJsonLd({
  name,
  description,
  path,
  serviceType,
  keywords,
  image = DEFAULT_OG_IMAGE
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    areaServed: "BR",
    provider: {
      "@id": `${absoluteUrl("/")}#engineering-service`
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Indústria, energia e infraestrutura"
    },
    keywords: keywords.join(", "),
    image: absoluteUrl(image),
    url: absoluteUrl(path)
  };
}

export function createFaqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
};

export function createBlogPostingJsonLd({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  datePublished,
  dateModified
}: ArticleSchemaInput) {
  const publishedDate = `${datePublished}T00:00:00-03:00`;
  const modifiedDate = `${(dateModified ?? datePublished)}T00:00:00-03:00`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    inLanguage: "pt-BR",
    publisher: {
      "@id": `${absoluteUrl("/")}#engineering-service`
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };
}
