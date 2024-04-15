<script setup lang="ts">
import { h, ref, watch, watchEffect, Component as ComponentType } from 'vue'
import { NIcon, useMessage, NSkeleton, NSpace } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { vscode } from '@/utils/vscode'
import {
  BookOutline as BookIcon,
  AlertOutline,
  LogoGithub,
  Apps,
  GridOutline
} from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()

function renderIcon(icon: ComponentType) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Home',
    key: 'Home',
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Tech',
    key: 'Tech',
    icon: renderIcon(Apps)
  },
  {
    label: 'Wallpaper',
    key: 'Wallpaper',
    icon: renderIcon(GridOutline)
  },
  {
    label: 'Github',
    key: 'Github',
    icon: renderIcon(LogoGithub)
  },
  {
    label: 'About',
    key: 'About',
    icon: renderIcon(AlertOutline)
  }
]

const message = useMessage()

const activeKey = ref<string | null>('Home')

const gotoPage = (name: string) => {
  console.log('🛸 layout/DemoLayout.vue:49 ~ [route]:', route)
  if (route.name !== name) {
    router.push({ name })
    message.success(`Website message: Welcome to ${name} Page`)
    vscode.postMessage({
      command: 'gotoPage',
      text: `VS Code Message: Welcome to ${name} Page`
    })
  }
}

watch(
  () => route.name,
  (name) => {
    activeKey.value = name as string
  },
  { immediate: true }
)

watchEffect(() => {
  console.log('🛸 layout/DemoLayout.vue:74 ~ [activeKey]:', activeKey.value)
  if (activeKey.value && activeKey.value !== route.name) {
    gotoPage(activeKey.value)
  }
})
</script>

<template>
  <div class="demo-layout wh-full">
    <n-layout has-sider class="h-full">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        show-trigger
        content-class="h-full"
      >
        <n-menu v-model:value="activeKey" :options="menuOptions" responsive />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" class="h-full">
        <Suspense>
          <router-view v-slot="{ Component: routerComponent }">
            <transition name="fade" mode="out-in">
              <component :is="routerComponent" />
            </transition>
          </router-view>
          <template #fallback>
            <n-space vertical>
              <n-skeleton height="40px" width="33%" />
              <n-skeleton height="40px" width="66%" :sharp="false" />
              <n-skeleton height="40px" round />
              <n-skeleton height="40px" circle />
            </n-space>
          </template>
        </Suspense>
      </n-layout>
    </n-layout>
  </div>
</template>

<style></style>
