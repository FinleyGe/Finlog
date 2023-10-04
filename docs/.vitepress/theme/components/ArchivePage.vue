<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
// import {NButton, NSpace, NH1, NCollapse, NCollapseItem} from 'naive-ui';
import * as naive from 'naive-ui';
const {NButton, NSpace, NH1, NCollapse, NCollapseItem} = naive;

import { ThemeConfig } from '../../type';
import { PostMeta } from '../../utils';
import i18n from '../i18n';
const { lang, theme, localeIndex } = useData<ThemeConfig>();
const router = useRouter();
const posts = theme.value.posts[lang.value];

type Archive = {
  [year: string]: PostMeta[]
}
let archive: Archive = {};
posts.forEach(post => {
  const year = new Date(post.matter.date).getFullYear().toString();
  if (archive[year]) {
    archive[year].push(post);
  } else {
    archive[year] = [post];
  }
});

function handleClick(link:string){
  if (localeIndex.value !== 'root') {
    router.go(`/${localeIndex.value}/posts/${link}`);
  } else {
    router.go(`/posts/${link}`);
  }
}
</script>
<template>
  <n-h1>
    {{ i18n.archive[lang] }}
  </n-h1>
  <n-collapse>
    <n-collapse-item
      v-for="year in Object.keys(archive).reverse()"
      :key="year"
      :title="year + `(${archive[year].length})`"
    >
      <n-space vertical>
        <n-button
          v-for="post in archive[year]"
          :key="post.link" 
          text
          @click="handleClick(post.link)"
        >
          {{ post.matter.title }}
          {{ post.matter.date }}
        </n-button>
      </n-space>
    </n-collapse-item>
  </n-collapse>
</template>

<style scoped lang="scss">

</style>
