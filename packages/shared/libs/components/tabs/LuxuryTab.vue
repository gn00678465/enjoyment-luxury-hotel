<template>
  <Primitive :as="props.as" class="p-4 relative transition-colors after:(absolute content-[''] h-1 w-8 bottom-0.5 left-1/2 -translate-x-1/2 rounded-[10px])"
    :class="{
      'text-primary': props.active,
      'after:(bg-primary)': props.active
    }"
  >
    <slot></slot>
  </Primitive>
</template>

<script setup lang="ts">
import { Primitive } from 'vue-materials/primitive'
import type { PropType } from 'vue'

const props = defineProps({
  as: {
    type: [String, Object] as PropType<string | object>,
    default: 'div'
  },
  active: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>

</style>