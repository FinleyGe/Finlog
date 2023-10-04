import { defineConfigWithTheme } from "vitepress"
import type { ThemeConfig, UserConfig } from "./type"
import { getAllPosts } from "./utils"
import { buildEnd } from './hooks'
import { cjsInterop } from "vite-plugin-cjs-interop";

let userConfig: UserConfig = {
  languages: ['zhCN', 'enUS', 'deDE'],
  defaultLang: 'zhCN',
  author: 'Finley',
  icp: 'xxxxxxxxx',
  copyright: '2023 Finley All Rights Reserved.',
  url: 'https://example.com',
}

let postsdata = getAllPosts(userConfig.languages.filter(
  (lang) => lang !== userConfig.defaultLang
), userConfig.defaultLang)

export default defineConfigWithTheme<ThemeConfig>({
  // buildEnd: buildEnd,
  title: "Finlog",
  description: "A Vitepress + Obsidian Blog",
  themeConfig: {
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
  },
  vite: {
    plugins: [
      cjsInterop(
        {
          dependences: [
            'naive-ui',
          ]
        }
      ),
    ]
  },
})
