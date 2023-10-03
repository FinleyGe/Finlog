<script setup lang="ts">
import { useData } from 'vitepress';
const { frontmatter, lang, theme } = useData();
import { NConfigProvider, NLayoutFooter, NMessageProvider, enUS, zhCN, dateEnUS, dateZhCN, darkTheme, GlobalTheme, NLayout, NLayoutContent } from 'naive-ui';
import Nav from './components/Nav.vue';
import HomePage from './components/HomePage.vue';
import PostPage from './components/PostPage.vue';
import Copyright from './components/Copyright.vue';
import ArchivePage from './components/ArchivePage.vue';
import CategoreisPage from './components/CategoriesPage.vue';
import SearchPage from './components/SearchPage.vue';
import TagsPage from './components/TagsPage.vue';
import { provide, ref } from 'vue';
import {globalThemeKey} from '../type';

const locale = lang.value === 'zhCN' ? zhCN : enUS;
const dateLocale = lang.value == 'zhCN' ? dateZhCN : dateEnUS;

const globalTheme = ref<GlobalTheme | null>(null);

function changeGlobalTheme() {
  globalTheme.value = globalTheme.value === null ? darkTheme : null;
}

provide(
  globalThemeKey, {
    globalTheme,
    changeGlobalTheme
  }
);

</script>

<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    :theme="globalTheme"
  >
    <n-message-provider>
      <n-layout>
        <Nav />
        <!-- {{theme}} -->
        <!-- {{useData()}} -->
        <n-layout-content content-style="padding: 24px">
          <template v-if="frontmatter.home">
            <home-page />
          </template>
          <template v-else-if="frontmatter.post">
            <post-page>
              <Content />
            </post-page>
          </template>
          <template v-else-if="frontmatter.archive">
            <archive-page />
          </template>
          <template v-else-if="frontmatter.categories">
            <CategoreisPage />
          </template>
          <template v-else-if="frontmatter.tags">
            <TagsPage />
          </template>
          <template v-else-if="frontmatter.search">
            <SearchPage />
          </template>
          <template v-else>
            <post-page>
              <Content />
            </post-page>
          </template>
        </n-layout-content>
        <n-layout-footer>
          <copyright>
            {{ theme.copyright }}
          </copyright>
        </n-layout-footer>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>
