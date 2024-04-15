<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { NSkeleton, NImage, NCard, NVirtualList } from 'naive-ui'
import axios from 'axios'

const wallpaperResponse = ref({})
const wallpaperInfo = reactive({
  LastUpdate: '',
  data: [],
  status: false
})

const title = computed(() => {
  return `Bing Wallpaper - ${wallpaperInfo.LastUpdate}`
})

const fetchBingWallpaper = () => {
  axios
    .get(
      'https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/zh-CN_all.json'
    )
    .then((res) => {
      if (res?.data?.status && res?.data?.success) {
        wallpaperResponse.value = res?.data ?? {}
        wallpaperInfo.LastUpdate = res?.data?.LastUpdate
        wallpaperInfo.data = res?.data?.data ?? []
        wallpaperInfo.status = res?.data?.status
      }
    })
}

onMounted(() => {
  fetchBingWallpaper()
})
</script>

<template>
  <div class="h-full">
    <n-card
      :title="title"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
      content-style="padding: 0;"
      content-class="h-screen-sm"
    >
      <template #header-extra>开放 API+虚拟列表</template>
      <n-skeleton v-if="!wallpaperInfo.status" text :repeat="6" />
      <template v-else>
        <n-virtual-list
          :item-size="480"
          style="max-height: 500px"
          item-resizable
          :items="wallpaperInfo.data"
          padding-top="5px"
        >
          <template #default="{ item }">
            <n-card
              size="small"
              :title="item.title"
              :key="item.copyrightlink"
              class="my-5 mx-2"
            >
              <template #cover>
                <a :href="`https://cn.bing.com/${item.url}`" target="_blank">
                  <n-image
                    lazy
                    :src="`https://cn.bing.com/${item.url}`"
                    :show-toolbar="false"
                    :preview-disabled="true"
                    :alt="item.copyright"
                  >
                    <template #placeholder>
                      <n-skeleton text :repeat="3" />
                    </template>
                  </n-image>
                </a>
              </template>
              {{ item.copyright }}
            </n-card>
          </template>
        </n-virtual-list>
      </template>
      <template #footer>
        <n-tag :type="wallpaperInfo.status ? 'success' : 'error'">
          接口请求状态：{{ wallpaperInfo.status }}
        </n-tag>
      </template>
    </n-card>
  </div>
</template>

<style lang="scss" scoped></style>
