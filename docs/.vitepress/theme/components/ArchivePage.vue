<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import { onMounted } from 'vue';
import {NButton, NSpace, NH1, NCollapse, NCollapseItem} from 'naive-ui'
import { ThemeConfig } from '../../type';
import { PostMeta } from '../../utils';
import i18n from '../i18n';
const { frontmatter, lang, theme, localeIndex } = useData<ThemeConfig>()
const router = useRouter()
const posts = theme.value.posts[lang.value]

type Archive = {
  [year: string]: PostMeta[]
}
let archive: Archive = {}
posts.forEach(post => {
  const year = new Date(post.matter.date).getFullYear().toString()
  if (archive[year]) {
    archive[year].push(post)
  } else {
    archive[year] = [post]
  }
})

function handleClick(link:string){
  if (localeIndex.value !== 'root') {
    router.go(`/${localeIndex.value}/posts/${link}`)
  } else {
    router.go(`/posts/${link}`)
  }
}
</script>
<template>
  <n-h1>
    {{i18n.archive[lang]}}
  </n-h1>
  <n-collapse>
    <n-collapse-item
      :title="year + `(${archive[year].length})`" v-for="year in Object.keys(archive).reverse()"
      :key="year">
      <n-space vertical>
        <n-button
          text
          v-for="post in archive[year]" 
          @click="handleClick(post.link)"
          >
          {{post.matter.title}}
          {{post.matter.date}}
        </n-button>
      </n-space>
      <!-- <div v-for="post in archive[year]"> -->
      <!-- </div> -->
      </n-collapse-item>
      </n-collapse>
</template>

<style scoped lang="scss">

</style>
