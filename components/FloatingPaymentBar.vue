<template>
  <div class="fixed bottom-0 left-0 right-0 shadow-lg z-50 transition-all duration-300 flex flex-col w-full"
  :style="styles"
  >
    <TransitionBackgroundBlur :show="!isFirstStep && !isLastStep">
      <div class="relative w-full h-full">
        <div class="bg-white bottom-0 pb-[var(--bottom-height)] absolute w-full h-auto rounded-t-2 overflow-hidden">
          <header class="pt-4 pb-2 px-6 bg-neutral-10 block w-full border-b-1 border-color-[#ECECEC]">
            <IcRoundClose :width="24" :height="24" @click="onClose"></IcRoundClose>
            <div class="mt-4 text-h6 font-700">
              <template v-if="currentStep === 2">
                <p>選擇入住日期</p>
              </template>
              <template v-if="currentStep === 3">
                <p>選擇退房日期</p>
              </template>
              <template v-if="currentStep === 4 || currentStep === 5">
                <p class="flex items-center gap-x-4 font-700">{{ dates?.start && dates?.end && differenceInDays(dates.end, dates.start) }} 晚
                  <span class="text-body2 text-neutral-80 font-500">
                    {{ formatter(dates?.start) }} - {{ formatter(dates?.end) }}
                  </span>
                </p>
              </template>
            </div>
            <ul v-if="currentStep !== 5" class="flex items-center w-full">
              <li v-for="i of 7" class="text-subtitle font-700 w-10 h-10 flex justify-center items-center flex-grow-1">
                {{ weekdays[i - 1] }}
              </li>
            </ul>
          </header>
          <template v-if="currentStep !== 5 && currentStep !== 6">
            <VCalendar v-bind="vcalendarProps" :min-date="new Date()" class="w-full" @dayclick="onUpdateDates">
              <template #header-title="props">
                <p class="text-subtitle font-700">{{ props.title }}</p>
              </template>
            </VCalendar>
          </template>
          <template v-if="currentStep === 5">
            <div class="p-6">
              <p class="mb-1 text-title font-700">選擇人數</p>
              <p class="text-body2 font-500 mb-4">此房型最多供 4 人居住，不接受寵物入住。</p>
              <Counter v-model:value="person" :max="4" />
            </div>
          </template>
        </div>
      </div>
    </TransitionBackgroundBlur>
    <div ref="barRef" class="flex flex-grow-0 flex-shrink-1 items-center justify-between p-3 border-t-1 bg-white border-color-[#ECECEC] gap-x-4 z-1">
      <template v-if="isFirstStep">
        <p>ＮＴ$ {{ $n(price) }} / 晚</p>
        <LuxuryButton @click="nextStep">查看可訂日期</LuxuryButton>
      </template>
      <template v-if="currentStep === 2 || currentStep === 3 || currentStep === 4">
        <LuxuryButton block ghost class="text-neutral-80!" @click="onCleanupDates">清除日期</LuxuryButton>
        <LuxuryButton block :disabled="!(dates?.start) || !(dates?.end)" @click="nextStep">確定日期</LuxuryButton>
      </template>
      <template v-if="currentStep === 5">
        <LuxuryButton block ghost class="text-neutral-80!" @click="onCleanupDates">重新選擇日期</LuxuryButton>
        <LuxuryButton block @click="nextStep">儲存</LuxuryButton>
      </template>
      <template v-if="currentStep === 6">
        <div class="text-body2">
          <p>ＮＴ$ {{ $n(price) }} / {{ dates?.start && dates?.end && differenceInDays(dates.end, dates.start) }} 晚 / {{ person }}人</p>
          <p>{{ formatter(dates?.start, 'MM / dd') }} - {{ formatter(dates?.end, 'MM / dd') }}</p>
        </div>
        <LuxuryButton>立即預訂</LuxuryButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LuxuryButton } from '@enjoyment-luxury-hotel/shared/components'
import IcRoundClose from '~icons/ic/round-close'
import { useStep } from '@enjoyment-luxury-hotel/shared/compoables'
import type { CalendarDay } from 'v-calendar/dist/types/src/utils/page.js';
import { isBefore, isAfter, format, differenceInDays } from 'date-fns'

const [dates] = defineModel<Record<'start' | 'end', Date | null> | undefined>('dates', { default: undefined })
const [person] = defineModel<number>('person', { default: 1 })
const props = withDefaults(defineProps<FloatingPaymentBarProps>(), {
  price: 0
})
const { price } = toRefs(props)

const barRef = ref<HTMLDivElement>()
const { currentStep, isFirstStep, nextStep, goFirst, setStep, isLastStep } = useStep({
  initialStep: 1,
  maxStep: 6,
  minStep: 1
})


const { height } = useElementSize(barRef, { height: 80, width: 0 })
const styles = reactive({
  '--bottom-height': height.value + 'px'
})

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const vcalendarProps = reactive({
  expanded: true,
  transparent: true,
  borderless: true,
  'trim-weeks': true,
  color: 'black',
  rows: 2,
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
  nextStep()
}

function formatter(date: Date | number | null | undefined, pattern: string = 'yyyy / MM / dd') {
  if (!date) return ''
  return format(date, pattern)
}

function onClose() {
  goFirst()
}

function onCleanupDates() {
  dates.value = undefined
  setStep(2)
}

</script>

<script lang="ts">
export interface FloatingPaymentBarProps {
  price?: number
}


</script>

<style scoped>
:deep(.vc-container) {
  padding: 24px;
}
:deep(.vc-weekdays) {
  display: none;
}

:deep(.vc-black) {
  --vc-accent-200: #F9F9F9;
  --vc-accent-500: #000000;
  --vc-accent-600: #000000;
  --vc-accent-900: #000000;
}

</style>