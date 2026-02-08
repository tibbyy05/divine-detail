import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://divinedetail.com';
  const lastModified = new Date();

  return [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/services`, lastModified },
    { url: `${baseUrl}/about`, lastModified },
    { url: `${baseUrl}/contact`, lastModified },
    { url: `${baseUrl}/book`, lastModified },
  ];
}
