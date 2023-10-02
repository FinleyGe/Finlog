import { defineConfigWithTheme } from "vitepress"
import type { ThemeConfig, UserConfig } from "./type"
import { getAllPosts } from "./utils"

let userConfig: UserConfig = {
  languages: ['zhCN', 'enUS', 'deDE'],
  defaultLang: 'zhCN',
  author: 'Finley',
  icp: 'xxxxxxxxx',
  copyright: '2023 Finley All Rights Reserved.',
}

let postsdata = getAllPosts(userConfig.languages.filter(
  (lang) => lang !== userConfig.defaultLang
), userConfig.defaultLang)

export default defineConfigWithTheme<ThemeConfig>({
  title: "Finlog",
  description: "A Vitepress + Obsidian Blog",
  themeConfig: {
    // posts: getAllPosts(userConfig.languages.filter(
    //   (lang) => lang !== userConfig.defaultLang
    // ), userConfig.defaultLang),
    // ...userConfig,
    // tags: [],
    // categories: [],

    posts: postsdata.postmeta,
    tags: postsdata.tags,
    categories: postsdata.categories,
    ...userConfig,
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zhCN',
    },
    enUS: {
      label: 'English',
      lang: 'enUS',
    },
    deDE: {
      label: 'Deutsch',
      lang: 'deDE',
    },
  }
})
