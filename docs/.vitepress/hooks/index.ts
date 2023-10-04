import { SiteConfig   } from "vitepress";
import { createRssFeed } from "./rss";
import { ThemeConfig } from "../type";
export function buildEnd(config: SiteConfig<ThemeConfig>) {
  createRssFeed(config);
}
