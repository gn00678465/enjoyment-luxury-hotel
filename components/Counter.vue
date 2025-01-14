<template>
  <div class="flex items-center gap-x-4">
    <button class="border border-neutral-40 rounded-full p-4" :disabled="count === 1" @click="decrement">
      <IcRoundMinus :width="24" :height="24" class="transition-color duration-300" :class="[count === 1 && 'text-neutral-60']"></IcRoundMinus>
    </button>
    <span class="text-h6 w-6 text-center inline-block">{{ count }}</span>
    <button class="border border-neutral-40 rounded-full p-4" @click="increment">
      <IcRoundAdd :width="24" :height="24" class="transition-color duration-300" :class="[count === props.max && 'text-neutral-60']"></IcRoundAdd>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCounter } from '@enjoyment-luxury-hotel/shared/compoables'
import IcRoundAdd from '~icons/ic/round-add';
import IcRoundMinus from '~icons/ic/round-minus';

const [modelValue] = defineModel<number>('value', { default: 1 })

const props = defineProps({
  max: {
    type: Number,
    default: Infinity
  }
})

const { count, increment, decrement } = useCounter({
  initial: modelValue.value,
  min: 1,
  max: props.max,
  step: 1,
  onChange(newValue) {
    modelValue.value = newValue
  },
})

</script>

<style scoped>

</style>