<template>
  <NuxtLayout name="user-layout">
    <template #left>
      <div class="p-6 bg-white rounded-5"></div>
    </template>
    <template #right>
      <div class="p-6 bg-white rounded-5"></div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">

defineOptions({
  name: 'UserOrder'
})

definePageMeta({
  layout: false,
  name: 'user-order',
  meta: {
    title: '我的訂單'
  },
  props: true,
  headerFade: false,
})

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
})
const { userId } = toRefs(props)
</script>

<style scoped>

</style>