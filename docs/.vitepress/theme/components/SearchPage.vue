<script setup lang="ts">
import { NSpace, NInput, NIcon } from 'naive-ui'
import i18n from '../i18n';
import { useData } from 'vitepress'
const { lang, theme } = useData()
import { Search } from '@vicons/ionicons5'
function handleSearch(e: any) {
  console.log(e)
}
</script>
<template>
  <n-space vertical>
    <n-input :placeholder="i18n.search[lang]" @input="handleSearch">
      <template #prefix>
        <n-icon>
          <Search />
        </n-icon>
      </template>
    </n-input>
  </n-space>
</template>

<style scoped lang="scss"></style>
