<template>
  <div class="row" :style="styles">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" generic="Breakpoints extends string">
import { flexContainerSymbol, type FlexContainerProvide } from './FlexContainer.vue'

const rowInject = inject<Partial<FlexContainerProvide<Breakpoints>>>(flexContainerSymbol, { gutter: 24  })

const styles = reactive({
  '--gutter-x': ((rowInject.gutter!) / 2) + 'px',
  '--gutter-y': '0px'
})

</script>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--gutter-y)* -1);
  margin-right: calc(var(--gutter-x) / -2);
  margin-left: calc(var(--gutter-x) / -2);
  & > * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: calc(var(--gutter-x) / 2);
    padding-left: calc(var(--gutter-x) / 2);
    margin-top: var(--gutter-y);
  }
}
</style>