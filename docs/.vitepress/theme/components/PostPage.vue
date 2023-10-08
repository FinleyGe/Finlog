<script setup lang="ts">
import * as naive from 'naive-ui';
const { NCard, NSpace, NTag, useThemeVars } = naive;
import { useData } from 'vitepress';
const { frontmatter, lang } = useData();
import i18n from '../i18n';
const themeVars = useThemeVars();
</script>
<template>
  <n-card>
    <h1 class="title">{{ frontmatter.title }}</h1>
    <span class="publish">
      {{ i18n.publishTime[lang] }} {{ frontmatter.date }}
    </span>
    <div class="tags">
      <n-space>
        <n-tag v-for="tag in frontmatter.tags" :key="tag">{{ tag }}</n-tag>
      </n-space>
    </div>
  </n-card>
  <n-card>
    <div class="doc">
      <slot />
    </div>
  </n-card>
</template>

<style scoped lang="scss">
h1 {
  color: v-bind("themeVars.primaryColor");
}

.publish {
  font-style: italic;
}

.doc {
  $primary-color: v-bind("themeVars.primaryColor");
  $table-color: v-bind("themeVars.tableColor");
  $table-header-color: v-bind("themeVars.tableHeaderColor");
  $table-color-hover: v-bind("themeVars.tableColorHover");
  $table-color-striped: v-bind("themeVars.tableColorStriped");
  $border-color: v-bind("themeVars.borderColor");
  @import '../style/doc.scss';
}
</style>
