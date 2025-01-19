<template>
  <div :class="clsx('space-y-6', props.class)">
    <div v-if="showBasicInfo">
      <p class="relative text-title mb-4 md:(text-h5) before:(absolute content-[''] h-full w-1 bg-primary rounded-[10px])">
        <span class="ml-4 font-700">房型基本資訊</span>
      </p>
      <div class="flex items-center gap-x-4">
        <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40 bg-white"></div>
        <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40 bg-white"></div>
        <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40 bg-white"></div>
      </div>
    </div>

    <div v-if="showRoomLayout">
      <p class="relative text-title mb-4 md:(text-h5 mb-6) before:(absolute content-[''] h-full w-1 bg-primary rounded-[10px])">
        <span class="ml-4 font-700">房間格局</span>
      </p>
      <div class="p-6 bg-white rounded-2" :class="roomLayoutClass">
        11111
      </div>
    </div>

    <div v-if="showRoomEquipment">
      <p class="relative text-title mb-4 md:(text-h5 mb-6) before:(absolute content-[''] h-full w-1 bg-primary rounded-[10px])">
        <span class="ml-4 font-700">房內設備</span>
      </p>
      <div class="p-6 bg-white rounded-2" :class="roomEquipmentClass">
        11111
      </div>
    </div>

    <div v-if="showRoomAmenity">
      <p class="relative text-title mb-4 md:(text-h5 mb-6) before:(absolute content-[''] h-full w-1 bg-primary rounded-[10px])">
        <span class="ml-4 font-700">備品提供</span>
      </p>
      <div class="p-6 bg-white rounded-2" :class="roomAmenityClass">
        11111
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { clsx } from 'clsx'

const props = withDefaults(defineProps<RoomBasicInfoProps>(), {
  class: undefined,
  showBasicInfo: true,
  showRoomLayout: true,
  roomLayoutClass: '',
  showRoomEquipment: true,
  roomEquipmentClass: '',
  showRoomAmenity: true,
  roomAmenityClass: '',
})
const {
  showBasicInfo,
  showRoomLayout,
  roomLayoutClass,
  showRoomEquipment,
  roomEquipmentClass,
  showRoomAmenity,
  roomAmenityClass
} = toRefs(props)


</script>

<script lang="ts">
export interface RoomBasicInfoProps {
  class?: HTMLAttributes['class']
  showBasicInfo?: boolean
  showRoomLayout?: boolean
  roomLayoutClass?: string
  showRoomEquipment?: boolean
  roomEquipmentClass?: string
  showRoomAmenity?: boolean
  roomAmenityClass?: string
}


</script>

<style scoped>

</style>