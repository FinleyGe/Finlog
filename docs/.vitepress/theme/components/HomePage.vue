<script setup lang="ts">
import { useData, useRouter} from 'vitepress';
const router = useRouter();
const { lang, theme, localeIndex } = useData<ThemeConfig>();
// import { NButton, NIcon, NCard, NSpace, NTag} from 'naive-ui';
import * as naive from 'naive-ui';
const { NButton, NIcon, NCard, NSpace, NTag} = naive;
import { ThemeConfig } from '../../type';
import i18n from '../i18n';
import { IosArrowDropright } from '@vicons/ionicons4';

function handlePostClicked(link: string) {
  if (localeIndex.value !== 'root') {
    router.go(`/${localeIndex.value}/posts/${link}`);
  } else {
    router.go(`/posts/${link}`);
  }
}

</script>
<template>
  <n-space vertical>
    <n-card
      v-for="post in theme.posts[lang]"
      :key="post.link"
      :title="post.matter.title as string"
      hoverable
    >
      <n-space>
        <n-tag 
          v-for="tag in post.matter.tags"
          :key="tag"
        >
          {{ tag }}
        <!-- TODO: The tag should be a link -->
        </n-tag>
      </n-space>
      <p v-if="post.matter.abstract">
        {{ post.matter.abstract }}
      </p>
      <p v-else>
        {{ i18n.noAbstract[lang] }}
      </p>
      <template #header-extra>
        <n-button 
          text 
          style="font-size: 24px" 
          @click="handlePostClicked(post.link)"
        >
          <n-icon>
            <IosArrowDropright />
          </n-icon>
        </n-button>
      </template>
      <template #footer>
        <span>{{ post.matter.date }}</span>
      </template>
    </n-card>
  </n-space>
</template>

<style scoped lang="scss">

</style>
