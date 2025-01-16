<template>
  <LuxuryInput :label-class="props.labelClass" :show-feedback="false" label="姓名" placeholder="請輸入姓名" />
  <LuxuryInput :label-class="props.labelClass" :show-feedback="false" label="手機號碼" placeholder="請輸入手機號碼"></LuxuryInput>
  <div>
    <LuxuryLabel :label-class="props.labelClass" label="生日" />
    <ul class="mt-2 flex items-center gap-x-2 w-full">
      <li class="flex-grow-1">
        <LuxuryDropdown class="w-full"></LuxuryDropdown>
      </li>
      <li class="flex-grow-1">
        <LuxuryDropdown class="w-full"></LuxuryDropdown>
      </li>
      <li class="flex-grow-1">
        <LuxuryDropdown class="w-full"></LuxuryDropdown>
      </li>
    </ul>
  </div>
  <div>
    <LuxuryLabel :label-class="props.labelClass" label="地址" />
    <ul class="mt-2 flex items-center gap-x-2 w-full">
      <li class="flex-grow-1">
        <LuxuryDropdown class="w-full"></LuxuryDropdown>
      </li>
      <li class="flex-grow-1">
        <LuxuryDropdown class="w-full"></LuxuryDropdown>
      </li>
    </ul>
    <LuxuryInput class="mt-2" :show-feedback="false" type="password" :show-label="false" placeholder="請輸入詳細地址"></LuxuryInput>
  </div>
</template>

<script setup lang="ts">
import { LuxuryInput, LuxuryLabel, LuxuryDropdown } from '@enjoyment-luxury-hotel/shared/components'
import type { HTMLAttributes } from 'vue';

const props = defineProps({
  labelClass: {
    type: String as HTMLAttributes['class'],
    default: undefined
  }
})

</script>

<style scoped>

</style>