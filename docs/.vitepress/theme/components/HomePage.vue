<script setup lang="ts">
import { useData, useRouter, useRoute} from 'vitepress'
const router = useRouter()
const { frontmatter, lang, theme, localeIndex } = useData<ThemeConfig>()
import { NButton,NIcon, NCard, NSpace, NTag} from 'naive-ui';
import { ThemeConfig } from '../../type';
import i18n from '../i18n';
import { IosArrowDropright } from '@vicons/ionicons4';

function handlePostClicked(link: string) {
  if (localeIndex.value !== 'root') {
    router.go(`/${localeIndex.value}/posts/${link}`)
  } else {
    router.go(`/posts/${link}`)
  }
}

</script>
<template>
  <n-space vertical>

  <n-card
    v-for="post in theme.posts[lang]"
    :title="post.matter.title as string"
    hoverable
    >
    <n-space>
      <n-tag 
        v-for="tag in post.matter.tags"
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
