<script setup lang="ts">
import { zhCN, dateZhCN, NMessageProvider, NConfigProvider } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" class="wh-full">
    <n-message-provider placement="top-right" :max="1" :duration="2000">
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
