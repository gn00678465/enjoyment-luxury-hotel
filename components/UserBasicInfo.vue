<template>
  <template v-if="editable">
    <LuxuryInput :label-class="props.labelClass" :show-feedback="false" label="姓名" placeholder="請輸入姓名" />
    <LuxuryInput :label-class="props.labelClass" :show-feedback="false" label="手機號碼" placeholder="請輸入手機號碼"></LuxuryInput>
  </template>
  <template v-else>
    <div>
      <LuxuryLabel :label-class="props.labelClass" label="姓名" />
      <p class="text-subtitle mt-2 font-700 md:(text-title)">Jessica Ｗang</p>
    </div>
    <div>
      <LuxuryLabel :label-class="props.labelClass" label="手機號碼" />
      <p class="text-subtitle mt-2 font-700 md:(text-title)">+886 912 345 678</p>
    </div>
  </template>
  <div>
    <LuxuryLabel :label-class="props.labelClass" label="生日" />
    <template v-if="editable">
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
    </template>
    <template v-else>
      <div class="text-subtitle mt-2 font-700 md:(text-title)">1990 年 8 月 15 日</div>
    </template>
  </div>
  <div>
    <LuxuryLabel :label-class="props.labelClass" label="地址" />
    <template v-if="editable">
      <ul class="mt-2 flex items-center gap-x-2 w-full">
        <li class="flex-grow-1">
          <LuxuryDropdown class="w-full"></LuxuryDropdown>
        </li>
        <li class="flex-grow-1">
          <LuxuryDropdown class="w-full"></LuxuryDropdown>
        </li>
      </ul>
      <LuxuryInput class="mt-2" :show-feedback="false" type="password" :show-label="false" placeholder="請輸入詳細地址"></LuxuryInput>
    </template>
    <template v-else>
      <div class="text-subtitle mt-2 font-700 md:(text-title)">
        高雄市新興區六角路 123 號
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { LuxuryInput, LuxuryLabel, LuxuryDropdown } from '@enjoyment-luxury-hotel/shared/components'
import type { HTMLAttributes } from 'vue';

const props = defineProps({
  labelClass: {
    type: String as HTMLAttributes['class'],
    default: undefined
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const { editable } = toRefs(props)

</script>

<style scoped>

</style>