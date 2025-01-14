<template>
  <div>
    <p class="relative text-title mb-4 md:(text-h5) before:(absolute content-[''] h-full w-1 bg-primary rounded-[10px])">
      <span class="ml-4 font-700">{{ label }}</span>
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<RoomInfoLabelProps>()

const { label } = toRefs(props)

</script>

<script lang="ts">
export interface RoomInfoLabelProps {
  label: string
}

</script>

<style scoped>

</style>