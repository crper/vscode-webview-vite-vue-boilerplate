<script setup lang="ts">
import { NTag, NButton } from 'naive-ui'
import { useCounterStore } from '@/store/modules/counter'
import { vscode } from '@/utils/vscode'
import VueSvg from '@/assets/vue.svg'

defineProps<{ msg: string }>()

const countStore = useCounterStore()

const handleClickIncrement = () => {
  countStore.increment()
  vscode.postMessage({
    command: 'increment',
    text: `从插件的 pinia 点击发送的值 ${countStore.count}`
  })
}
</script>

<template>
  <div class="f-c-c w-full">
    <VueSvg style="width: 300px; height: 300px" />
  </div>
  <h1>{{ msg }}</h1>

  <div class="card">
    <n-tag type="warning"> Pinia Test (Read & Write)</n-tag> >>>>
    <n-tag type="success">{{ countStore.count }}</n-tag> >>>>
    <n-button @click="handleClickIncrement">Click ++!!! </n-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
