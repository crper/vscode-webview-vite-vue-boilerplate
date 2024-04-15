<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()
</script>

<template>
  <n-result
    status="info"
    title="信息"
    description="在这个年代，信息就是金钱，金钱就是信息。"
  >
    <p class="text-center">
      这是一个基于Vite 5 + Vue3 + TypeScript + UnoCSS + Vue Router + Pinia
      的项目模板。
    </p>
    <template #footer>
      <n-button @click="() => router.push('/')" type="primary">
        返回首页
      </n-button>
    </template>
  </n-result>
</template>

<style lang="scss" scoped></style>
