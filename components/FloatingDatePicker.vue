<template>
  <div ref="reference" class="w-full grid grid-cols-2 gap-x-2" @click.capture="setTrue">
    <LuxuryDatePickerInput label="入住" :value="dates?.start" :formatter="formatter" />
    <LuxuryDatePickerInput label="退房" :value="dates?.end" :formatter="formatter" />
  </div>
  <TransitionRoot
    :show="show"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Dialog @close="onClickOutside">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <TransitionBackgroundBlur :show="show" aria-hidden="true" />

      <!-- Full-screen container to center the panel -->
      <div >
        <!-- The actual dialog panel -->
        <DialogPanel as="div" ref="floating" :style="floatingStyles" class="p-8 bg-white rounded-5 flex flex-col gap-y-10">
          <div class="flex gap-x-2 items-center">
            <div class="mr-15 flex-1 space-y-2">
              <p class="text-h5 font-700">{{ dates?.start && dates?.end && differenceInDays(dates.end, dates.start) || 0 }} 晚</p>
              <p class="text-body w-60 max-w-auto">{{ formatter(dates?.start) }} - {{ formatter(dates?.end) }}</p>
            </div>
            <LuxuryDatePickerInput class="max-w-[195px]" label="入住" :value="dates?.start" :formatter="formatter" />
            <LuxuryDatePickerInput class="max-w-[195px]" label="退房" :value="dates?.end" :formatter="formatter" />
          </div>
          <VCalendar v-bind="vcalendarProps" :min-date="new Date()" @dayclick="onUpdateDates">
            <template #header-title="props">
              <p class="text-subtitle font-700">{{ props.title }}</p>
            </template>
          </VCalendar>
          <div class="flex items-center justify-end gap-x-4">
            <LuxuryButton ghost class="text-neutral-80!" @click="onCleanupDates">清除日期</LuxuryButton>
            <LuxuryButton @click="setFalse">確定日期</LuxuryButton>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { LuxuryDatePickerInput, LuxuryButton } from '@enjoyment-luxury-hotel/shared/components'
import { useFloating, offset } from '@floating-ui/vue';
import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue'
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';
import { isBefore, isAfter, format, differenceInDays } from 'date-fns'

const [dates] = defineModel<Record<'start' | 'end', Date | null> | undefined>('dates', { default: undefined })

const reference = ref(null);
const floating = ref(null);
const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom-end',
  middleware: [offset({
    mainAxis: -106,
    crossAxis: 32
  })],
})

const { bool: show, setFalse, setTrue } = useBoolean(false)

function formatter(date: Date | number | null | undefined) {
  if (!date) return ''
  return format(date, 'yyyy / MM / dd')
}

function onUpdateDates(calendarDay: CalendarDay) {
  const { date, isDisabled } = calendarDay
  if (isDisabled) return
  const { start, end } = dates.value || {}
  if (!start) {
    dates.value = { start: date, end: null }
  }
  if (start && !end && isBefore(start, date)) {
    dates.value = { start, end: date }
  }
  if (start && !end && isAfter(start, date)) {
    dates.value = { start: date, end: start }
  }
}

function onCleanupDates() {
  dates.value = undefined
}

function onClickOutside() {
  onCleanupDates()
  setFalse()
}

const vcalendarProps = reactive({
  expanded: true,
  transparent: true,
  borderless: true,
  'trim-weeks': true,
  color: 'black',
  columns: 2,
  step: 1,
  'title-position': 'left',
  transition: 'fade',
  attributes : [
    {
      highlight: true,
      dates: computed(() => {
        if (!dates.value) return []
        return [{
          start: dates.value?.start,
          end: dates.value?.end,
          span: 1
        }]
      }),
    },
  ]
})

</script>

<style scoped>
:deep(.vc-pane-layout) {
  column-gap: 60px;
}

:deep(.vc-container) {
  font-family: inherit;
}

:deep(.vc-weekday) {
  font-size: 16px;
  line-height: 1.5;
  font-family: 'Noto Serif TC';
  color: #4B4B4B;
}


:deep(.vc-black) {
  --vc-accent-200: #F9F9F9;
  --vc-accent-500: #000000;
  --vc-accent-600: #000000;
  --vc-accent-900: #000000;
}

</style>