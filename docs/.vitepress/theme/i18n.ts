// import { dateDeDE, dateZhCN, deDE, enUS, zhCN } from "naive-ui";
import * as naive from "naive-ui";
const { dateEnUS, dateDeDE, dateZhCN, deDE, enUS, zhCN } = naive;

const i18n = {
  home: {
    zhCN: '首页',
    enUS: 'Home',
    deDE: 'Startseite',
  },
  posts: {
    zhCN: '文章',
    enUS: 'Posts',
    deDE: 'Beiträge',
  },
  about: {
    zhCN: '关于',
    enUS: 'About',
    deDE: 'Über',
  },
  tags: {
    zhCN: '标签',
    enUS: 'Tags',
    deDE: 'Schlagwörter',
  },
  categories: {
    zhCN: '分类',
    enUS: 'Categories',
    deDE: 'Kategorien',
  },
  archive: {
    zhCN: '归档',
    enUS: 'Archives',
    deDE: 'Archiv',
  },
  dark: {
    zhCN: '深色',
    enUS: 'Dark',
    deDE: 'Dunkel',
  },
  light: {
    zhCN: '浅色',
    enUS: 'Light',
    deDE: 'Hell',
  },
  links: {
    zhCN: '友链',
    enUS: 'Links',
    deDE: 'Links',
  },
  noAbstract: {
    zhCN: '暂无摘要',
    enUS: 'No abstract',
    deDE: 'Keine Zusammenfassung',
  },
  search: {
    zhCN: '搜索',
    enUS: 'Search',
    deDE: 'Suche',
  },
  noPosts: {
    zhCN: '暂无文章',
    enUS: 'No posts',
    deDE: 'Keine Beiträge',
  },
  langName: {
    zhCN: '简体中文',
    enUS: 'English (US)',
    deDE: 'Deutsch (DE)',
  },
  publishTime: {
    zhCN: '发布于',
    enUS: 'Published at',
    deDE: 'Veröffentlicht am',
  },
  lang: {
    zhCN: zhCN,
    enUS: enUS,
    deDE: deDE,
  },
  langDate: {
    zhCN: dateZhCN,
    enUS: dateEnUS,
    deDE: dateDeDE,
  },
  languageOptions: [
    {
      label: '简体中文',
      key: 'zhCN',
    },
    {
      label: 'English (US)',
      key: 'enUS',
    },
    {
      label: 'Deutsch (DE)',
      key: 'deDE',
    },
  ]
};

export default i18n;
