<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
// import { NButton, NSpace, NH1, NCollapse, NCollapseItem } from 'naive-ui';
import * as naive from 'naive-ui';
const { NButton, NSpace, NH1, NCollapse, NCollapseItem } = naive;
import { ThemeConfig } from '../../type';
import i18n from '../i18n';
const { lang, theme, localeIndex } = useData<ThemeConfig>();
const router = useRouter();
const posts = theme.value.posts[lang.value];
const categories = theme.value.categories[lang.value];

function handleClick(link: string) {
  if (localeIndex.value !== 'root') {
    router.go(`/${localeIndex.value}/posts/${link}`);
  } else {
    router.go(`/posts/${link}`);
  }
}

</script>
<template>
  <n-h1>
    {{ i18n.categories[lang] }}
  </n-h1>
  <n-collapse>
    <n-collapse-item
      v-for="category in categories"
      :key="category[0]"
      :title="category[0] + ` (${category[1]})`"
    >
      <n-space vertical>
        <n-button
          v-for="post in posts.filter(post => post.category === category[0])"
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

<style scoped lang="scss"></style>
