<template>
  <div class="pt-[var(--h-header)] bg-primary-tint h-full">
    <div class="flex-container py-10">
      <p class="flex items-center mb-10">
        <IcBaselineChevronLeft :width="viewport.isLessOrEquals('md') ? 24 : 40" :height="viewport.isLessOrEquals('md') ? 24 : 40" />
        <span class="ml-2 text-h5 font-700 md:text-h3">確認訂房資訊</span>
      </p>
      <div class="row">
        <div class="col-12 md:col-7 space-y-10">
          <div>
            <p class="text-h6 mb-8 font-700 md:(text-h4 mb-10)">訂房資訊</p>
            <ul class="space-y-6">
              <li class="flex items-center justify-between">
                <div class="space-y-2 flex-grow-1">
                  <p class="relative text-title font-700 pl-4 before:(absolute content-[''] h-full w-1 left-0 bg-primary rounded-[10px])">選擇房型</p>
                  <p class="text-body">尊爵雙人房</p>
                </div>
                <button class="text-base font-700 leading-normal tracking-wider underline underline-neutral-100 flex-shrink-0 transition-colors hover:(text-primary underline-primary)">編輯</button>
              </li>
              <li class="flex items-center justify-between">
                <div class="space-y-2 flex-grow-1">
                  <p class="relative text-title font-700 pl-4 before:(absolute content-[''] h-full w-1 left-0 bg-primary rounded-[10px])">訂房日期</p>
                  <p class="text-body">入住：6 月 10 日星期二</p>
                  <p class="text-body">退房：6 月 11 日星期三</p>
                </div>
                <button class="text-base font-700 leading-normal tracking-wider underline underline-neutral-100 flex-shrink-0 transition-colors hover:(text-primary underline-primary)">編輯</button>
              </li>
              <li class="flex items-center justify-between">
                <div class="space-y-2 flex-grow-1">
                  <p class="relative text-title font-700 pl-4 before:(absolute content-[''] h-full w-1 left-0 bg-primary rounded-[10px])">房客人數</p>
                  <p class="text-body">2 人</p>
                </div>
                <button class="text-base font-700 leading-normal tracking-wider underline underline-neutral-100 flex-shrink-0 transition-colors hover:(text-primary underline-primary)">編輯</button>
              </li>
            </ul>
          </div>
          <hr class="divider-h-60" />
          <div>
            <p class="text-h6 font-700 flex items-center justify-between mb-8 md:(text-h4 mb-10)">
              <span>訂房人資訊</span>
              <button class="text-base font-700 leading-normal tracking-wider underline text-primary underline-primary transition-colors hover:(text-primary-80 underline-primary-80)">套用會員資料</button>
            </p>
            <form class="space-y-6">
              <UserBasicInfo label-class="text-neutral-100"></UserBasicInfo>
            </form>
          </div>
          <hr class="divider-h-60" />
          <div>
            <p class="text-h6 font-700 md:(text-h4)">房間資訊</p>
          </div>
          <RoomBasicInfo></RoomBasicInfo>
        </div>
        <div class="col-12 md:(col block ml-12)">
          <div class="bg-white p-6 rounded-5 space-y-6 md:(space-y-10 sticky top-[calc(var(--h-header)_+_40px)])">
            <div>
              <!-- <NuxtImg></NuxtImg> -->
            </div>
            <ul class="space-y-6">
              <li>
                <h4 class="text-h6">價格詳情</h4>
              </li>
              <li>
                <p class="flex items-center justify-between mb-3 text-body">
                  <span>NT$ 10,000</span>
                  <span class="ml-2 mr-auto">X 2 晚</span>
                  <span>NT$ 20,000</span>
                </p>
                <p class="flex items-center justify-between text-body">
                  <span>住宿折扣</span>
                  <span class="text-primary">-NT$ 1,000</span>
                </p>
              </li>
              <li><hr class="divider-h-60" /></li>
              <li>
                <p class="flex items-center justify-between text-title font-700">
                  <span>總價</span>
                  <span>NT$ 19,000</span>
                </p>
              </li>
            </ul>
            <LuxuryButton block>確認訂房</LuxuryButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcBaselineChevronLeft from '~icons/ic/baseline-chevron-left'
import { LuxuryButton } from '@enjoyment-luxury-hotel/shared/components';

definePageMeta({
  name: 'Client_Room_booking',
  layout: 'client-layout',
  headerFade: false,
  props: true,
})

useSeoMeta({
  title: 'Booking Room'
})

const props = defineProps({
  roomId: {
    type: String,
    required: true
  }
})

const viewport = useViewport()

</script>

<style scoped>

</style>