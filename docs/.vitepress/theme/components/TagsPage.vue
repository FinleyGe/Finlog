<script setup lang="ts">
import { useData } from 'vitepress';
import { ThemeConfig } from '../../type';
const { lang, theme } = useData<ThemeConfig>();
import { NCard, NTag, NSpace, NH1, NButton } from 'naive-ui';
import i18n from '../i18n';
import { PostMeta } from '../../utils';
import { computed, ref } from 'vue';
const checkedTags = ref<boolean[]>(
  Array(theme.value.tags[lang.value].length).fill(false)
);

const posts = computed(() => {
  const posts = theme.value.posts[lang.value];
  const tags = theme.value.tags[lang.value];
  const result: PostMeta[] = [];
  if (checkedTags.value.every((value) => !value)) {
    return [];
  }
  posts.forEach((post) => {
    const postTags = post.matter.tags;
    let flag = true;
    for (let i = 0; i < tags.length; i++) {
      if (checkedTags.value[i] && postTags.includes(tags[i][0])) {
        flag = false;
        break;
      }
    }
    if (flag) {
      result.push(post);
    }
  });
  return result;
});

</script>
<template>
  <n-h1>
    {{ i18n.tags[lang] }}
  </n-h1>
  <n-card>
    <n-space>
      <n-tag
        v-for="(tag, index) in theme.tags[lang]"
        :key="tag[0]"
        v-model:checked="checkedTags[index]"
        checkable
      >
        {{ tag[0] }} ({{ tag[1] }})
      </n-tag>
    </n-space>
  </n-card>
  <n-card>
    <n-space vertical>
      <template
        v-if="posts.length != 0"
      >
        <n-button
          v-for="post in posts"
          :key="post.link"
          text
        >
          {{ post.matter.title }}
        </n-button>
      </template>
      <span v-else>{{ i18n.noPosts[lang] }}</span>
    </n-space>
  </n-card>
</template>

<style scoped lang="scss"></style>
