<template>
  <div :style="styles" class="date-picker-input border rounded-2 border-neutral-100 transition-colors duration-300 hover:(border-primary) active:(border-primary)">
    <div class="flex flex-col">
      <p class="text-tiny text-neutral-80">{{ label }}</p>
      <input v-model="formatValue" type="text" class="text-body text-neutral-100 outline-none flex-grow-1" readonly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, reactive, computed } from 'vue';
import { parseSpacingToCSSVar } from 'vue-materials/utils'

const [modelValue] = defineModel<number | Date | null | undefined>('value', { default: undefined })
const props = withDefaults(defineProps<LuxuryDatePickerInputProps>(), {
  label: 'Label',
  formatter: undefined
})
const { label, formatter } = toRefs(props)

const formatValue = computed(() => formatter.value ? formatter.value(modelValue.value) : modelValue.value)

</script>

<script lang="ts">
export interface LuxuryDatePickerInputProps {
  label?: string
  formatter?: (date: number | Date | null | undefined) => string
}

const styles = reactive({
  ...parseSpacingToCSSVar('calc(1rem - 1px)')
})

</script>

<style scoped>
.date-picker-input {
  padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left);
}

</style>