<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts" generic="Breakpoints extends string">
import { flexContainerSymbol, type FlexContainerProvide } from './FlexContainer.vue'

const viewport = useViewport()
const colInject = inject<Partial<FlexContainerProvide<Breakpoints>>>(flexContainerSymbol, { breakpoints: undefined  })
const props = withDefaults(defineProps<FlexColProps>(), {
  span: undefined
})

</script>

<script lang="ts">
export interface FlexColProps {
  span?: number | string
}


</script>

<style scoped>

</style>