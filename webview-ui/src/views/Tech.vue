<script setup lang="ts">
import { NDescriptions, NDescriptionsItem } from 'naive-ui'
</script>

<template>
  <n-descriptions label-placement="left" bordered :column="2" title="技术栈">
    <n-descriptions-item>
      <template #label>框架</template>
      Vue
    </n-descriptions-item>
    <n-descriptions-item label="路由"> Vue Router </n-descriptions-item>
    <n-descriptions-item label="状态管理"> Pinia </n-descriptions-item>
    <n-descriptions-item label="脚手架"> Vite</n-descriptions-item>
    <n-descriptions-item label="Atom CSS"> Unocss</n-descriptions-item>
    <n-descriptions-item label="UI"> Naive UI</n-descriptions-item>
  </n-descriptions>
</template>

<style lang="scss"></style>
