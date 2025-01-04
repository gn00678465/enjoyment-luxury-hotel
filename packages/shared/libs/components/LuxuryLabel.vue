<template>
  <label :for="htmlFor" class="flex-grow">
    <span class="text-white text-subtitle md:text-title">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = withDefaults(defineProps<LuxuryLabelProps>(), {
  label: '',
  for: undefined
})

const { label, for: htmlFor } = toRefs(props)

</script>

<script lang="ts">
export interface LuxuryLabelProps {
  label?: string
  for?: string
}
</script>

<style scoped>

</style>