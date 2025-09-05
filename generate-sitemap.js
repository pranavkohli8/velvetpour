import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://sipwithpranav.app' });

sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0 });
// If you add more routes later, add them here:
// sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });

sitemap.end();

streamToPromise(sitemap).then((data) => {
  createWriteStream('./public/sitemap.xml').write(data);
});
