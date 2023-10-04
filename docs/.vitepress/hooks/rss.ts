import { Feed } from 'feed';
import { ThemeConfig } from '../type';
import { PostMeta } from '../utils';
import path from 'path';
import { writeFileSync } from 'node:fs';
import { SiteConfig } from 'vitepress';

export function createRssFeed(config: SiteConfig<ThemeConfig>) {
  const feed = new Feed({
    title: config.site.title,
    description: config.site.description,
    id: config.site.themeConfig.url,
    link: config.site.themeConfig.url,
    language: config.site.themeConfig.defaultLang,
    favicon: `${config.site.themeConfig.url}/favicon.ico`,
    copyright: config.site.themeConfig.copyright,
  })

  config.site.themeConfig.languages.forEach((lang) => {
    const posts = config.site.themeConfig.posts[lang]
    posts.forEach((post: PostMeta) => {
      feed.addItem({
        title: post.matter.title,
        id: `${config.site.themeConfig.url}/${post.link}`,
        link: `${config.site.themeConfig.url}/${post.link}`,
        description: post.matter.abstract,
        date: new Date(post.matter.date),
      })
    })
  })
  writeFileSync(path.join(process.cwd(), 'docs', '.vitepress', 'dist', 'index.xml'), feed.rss2())
}
