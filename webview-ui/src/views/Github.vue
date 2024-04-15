<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NCard, NQrCode, NTag, NAvatar } from 'naive-ui'
import { useCounterStore } from '@/store/modules/counter'
import CatPng from '@/assets/cat.png'
import { vscode } from '@/utils/vscode'

const countStore = useCounterStore()

const qrcodeText = ref(
  'https://github.com/crper/vscode-webview-vite-vue-boilerplate'
)

const catPng = ref(CatPng)

const handleClickDecrement = () => {
  countStore.decrement()
  vscode.postMessage({
    command: 'increment',
    text: `从插件的 pinia 点击发送的值 ${countStore.count}`
  })
}
</script>

<template>
  <div class="f-c-c">
    <n-card
      title="Github"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      <template #header-extra>扫描下方二维码访问仓库</template>
      <div class="flex justify-evenly">
        <n-avatar round object-fit="cover" :size="300" :src="catPng" />
        <n-qr-code
          :value="qrcodeText"
          :size="300"
          color="#225A95FF"
          background-color="#F5F5F5"
        />
      </div>

      <template #footer>
        <n-tag type="warning"> Pinia Read</n-tag> >>>
        <n-tag type="success">{{ countStore.count }}</n-tag> >>>
        <n-button @click="handleClickDecrement">Click --!!! </n-button>
      </template>
      <template #action>
        <n-button type="primary">
          <a
            target="_blank"
            href="https://github.com/crper/vscode-webview-vite-vue-boilerplate"
            class="text-white hover:text-white decoration-none"
            >访问仓库</a
          >
        </n-button>
      </template>
    </n-card>
  </div>
</template>

<style lang="scss" scoped></style>
