<template>
  <div class="flex-container rounded-5 overflow-hidden">
    <div class="row">
      <div class="col-12 md:col-7 g-0">
        <Carousel height="200px md:457px" :options="{ navigation: true }">
        </Carousel>
      </div>
      <div class="col-12 md:col-5 bg-white p-4 flex flex-col justify-between gap-y-6 md:(p-10 gap-y-10)">
        <div class="space-y-2">
          <h4 class="text-h4 md:text-h2">{{ title }}</h4>
          <p class="text-body2 text-neutral-80 md:text-body">{{ description }}</p>
        </div>
        <div class="flex items-center gap-x-4">
          <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40"></div>
          <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40"></div>
          <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40"></div>
        </div>
        <div class="deco-line-r w-full h-[2px]"></div>
        <div class="text-title md:text-h5 text-primary h-14 flex items-center justify-between">
          <span class="font-700">NT$ {{ $n(price) }}</span>
          <MdiArrowRight class="cursor-pointer" width="24" height="24" @click="emits('click', id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdiArrowRight from '~icons/mdi/arrow-right';

const emits = defineEmits<{
  click: [id: RoomId]
}>()
const props = withDefaults(defineProps<RoomCardProps>(), {
  title: 'Title',
  description: 'Description',
  price: 10000,
})
const { title, description, price, id } = toRefs(props)

</script>

<script lang="ts">
export type RoomId = string | number

export interface RoomCardProps {
  id: RoomId
  title: string
  description: string
  price: number
}


</script>

<style scoped>

</style>