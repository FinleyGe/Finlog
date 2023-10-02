import { GlobalTheme } from "naive-ui"
import { PostMeta } from "./utils"
import type { InjectionKey, Ref } from "vue"


export type UserConfig = {
  defaultLang: string
  languages: string[]
  author: string
  icp?: string | null
  copyright?: string | null
}

type innerThemeConfig = {
  posts: { [key: string]: PostMeta[] }
  tags: { [key: string]: [string, number][] }
  categories: { [key: string]: [string, number][] }
}

export type ThemeConfig = UserConfig & innerThemeConfig

export const globalThemeKey =
  Symbol("globalThemekey") as InjectionKey<{
    globalTheme: Ref<GlobalTheme | null>,
    changeGlobalTheme: Function
  }>
