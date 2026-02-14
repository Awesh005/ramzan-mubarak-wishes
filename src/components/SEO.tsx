import * as React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Ramzan Mubarak 2026 - Premium Wishes & Calendar",
  description = "Celebrate Ramadan 2026 with our premium web app. Create personalized wishes, track live prayer times, and view the complete 30-day Ramadan calendar with an elegant dark theme.",
  keywords = "Ramadan 2026, Ramzan Mubarak, Ramadan Wishes, Prayer Times, Ramadan Calendar, Iftar Time, Sehri Time, Islamic Greetings",
  ogImage = "/og-image.jpg", // Default path, will update once generated
  ogType = "website",
  canonicalUrl = "https://ramzan-mubarak-wishes.vercel.app",
  structuredData
}) => {
  const fullTitle = title.includes("Ramzan Mubarak") ? title : `${title} | Ramzan Mubarak 2026`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
