<template>
  <label :for="htmlFor" class="flex-grow">
    <span :class="clsx('block text-subtitle md:text-title', labelClass)">{{ label }}</span>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { clsx } from 'clsx'

const props = withDefaults(defineProps<LuxuryLabelProps>(), {
  label: '',
  for: undefined,
  labelClass: 'text-white'
})

const { label, for: htmlFor, labelClass } = toRefs(props)

</script>

<script lang="ts">
export interface LuxuryLabelProps {
  label?: string
  for?: string
  labelClass?: string
}
</script>

<style scoped>

</style>