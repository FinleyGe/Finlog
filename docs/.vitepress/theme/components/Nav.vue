<script setup lang="ts">
import {NDropdown,NIcon, NButton, NLayoutHeader, NSpace, NMenu, MenuOption,NSwitch, darkTheme, NEl} from 'naive-ui';
import { Language, Search} from '@vicons/ionicons5';
import { useData, useRouter } from 'vitepress'
import { inject, ref, watch } from 'vue';
import i18n from '../i18n';
import { globalThemeKey, type ThemeConfig } from '../../type';
const { site,lang, theme, localeIndex} = useData<ThemeConfig>()

const router = useRouter()

const menuOptions = <MenuOption[]>[
{
  key:'about',
  label: i18n.about[lang.value]
},{
  key:'archive',
  label: i18n.archive[lang.value]
},{
  key:'categories',
  label: i18n.categories[lang.value]
},{
  key:'tags',
  label: i18n.tags[lang.value]
},{
  key:'links',
  label:
    i18n.links[lang.value]
}];

const menuActive = ref<string>('');

function handleRoute(val: string){
  if(localeIndex.value == 'root') {
    router.go(`/${val}`);
    return;
  } else
  router.go(`/${localeIndex.value}/${val}`);
}
watch(menuActive, handleRoute);

const {changeGlobalTheme} = inject(
  globalThemeKey
, {
  globalTheme: ref<null | typeof darkTheme>(null),
  changeGlobalTheme: () => {}
});

const languageOptions = i18n.languageOptions;

function handleSelectLanguage(key: string) {
  let path = router.route.path.split('/');
  let lang = key == theme.value.defaultLang ? '' : key;
  if (path.length <= 2){
    if (lang == '') {
      router.go('/');
    } else {
      router.go(`/${lang}/`);
    }
  } else {
    if (lang == '') {
      router.go(path.slice(2).join('/'));
    } else {
      router.go(`/${lang}/${path.slice(2).join('/')}`);
    }
  }
}

function handleSearchClicked() {
  if (localeIndex.value == 'root') {
    router.go('/search');
  } else {
    router.go(`/${localeIndex.value}/search`);
  }
}

</script>
<template>
<n-layout-header>
  <n-space justify="space-around" align="center">
    <n-el 
    tag="span" 
    style="
            color: var(--text-color-1);
            transition: 0.3s var(--cubic-bezier-ease-in-out);
            font-size: 20px;
            font-family: var(--font-family);
            cursor: pointer;
          "
    @click="() => {router.go('/');}"
      >
        {{ site.title }}
    </n-el>

    <n-menu :options="menuOptions" mode="horizontal" v-model:value="menuActive"/>

    <n-space align="center">
      <n-switch :on-update:value='() => {changeGlobalTheme()}'>
        <template #checked>
          <span>
            {{i18n.light[lang]}}
          </span>
        </template>
        <template #unchecked>
          <span>
            {{i18n.dark[lang]}}
          </span>
        </template>
      </n-switch>
      <n-dropdown trigger="hover" :options="languageOptions" @select="handleSelectLanguage">
          <n-button circle>
          <template #icon>
            <n-icon><language /></n-icon>
          </template>
        </n-button>
      </n-dropdown>
      <n-button circle @click="handleSearchClicked">
        <template #icon>
          <n-icon><Search /></n-icon>
        </template>
      </n-button>
    </n-space>
    </n-space>
</n-layout-header>
</template>

<style scoped lang="scss">
.nav{
  width: 100dvw;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
