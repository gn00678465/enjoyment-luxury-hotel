<template>
  <Primitive :as="props.as">
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
  }
})

</script>

<style scoped>

</style>