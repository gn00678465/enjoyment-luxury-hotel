<template>
  <div class="pt-[var(--h-header)] bg-body h-full">
    <div class="flex-container py-10 md:(py-30)">
      <div class="row">
        <div class="col-12 md:col-7">
          <div class="text-white space-y-10 md:(space-y-20)">
            <div>
              <div class="flex flex-col gap-y-4 md:(flex-row gap-y-0 gap-x-10 items-center)">
                <div class="bg-success p-2 rounded-full self-start md:(self-center)">
                  <IcBaselineCheck class="text-white" :width="size" :height="size" />
                </div>
                <div class="text-h3 md:text-h1 space-y-2">
                  <h2>恭喜，Jessica！</h2>
                  <h2>您已預訂成功</h2>
                </div>
              </div>
              <p class="text-body text-neutral-40 mt-8 md:mt-10">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</p>
            </div>
            <div class="divider-h-40"></div>
            <div>
              <p class="text-title text-h5 font-700 mb-6 md:(mb-10 leading-normal)">立即查看您的訂單紀錄</p>
              <LuxuryButton :block="viewport.isLessOrEquals('md')">前往我的訂單</LuxuryButton>
            </div>
            <div class="divider-h-40"></div>
            <div>
              <h5 class="text-h5 mb-8 md:(mb-10)">訂房人資訊</h5>
              <dl>
                <dt class="text-body mb-2 font-500">姓名</dt>
                <dd class="text-title font-500 mb-6">Jessica Ｗang</dd>

                <dt class="text-body mb-2 font-500">手機號碼</dt>
                <dd class="text-title font-500 mb-6">+886 912 345 678</dd>

                <dt class="text-body mb-2 font-500">電子信箱</dt>
                <dd class="text-title font-500 mb-6">jessica@sample.com</dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="col-12 gy-4 md:(col block ml-12 gy-0)">
          <div class="p-4 bg-white rounded-5 space-y-6 md:(space-y-10 p-10)">
            <div class="space-y-2">
              <p class="text-body2 text-neutral-80 md:text-body">預訂參考編號： {{ bookingId }}</p>
              <p class="text-title font-700 md:text-h5">即將來的行程</p>
            </div>
            <NuxtImg class="rounded-2 overflow-hidden w-full h-[150px] md:h-60" :src="src" fit="cover" />
            <div class="space-y-6">
              <div class="flex items-center gap-x-4 text-subtitle font-700 md:(text-h6)">
                <p class="inline-block">尊爵雙人房，1 晚</p>
                <div class="divider-v-60 inline-block h-[18px]"></div>
                <p class="inline-block">住宿人數：2 位</p>
              </div>
              <ul class="text-subtitle font-700 space-y-2 md:text-title">
                <li class="relative pl-4 before:(absolute content-[''] h-full w-1 bg-primary rounded-[10px] left-0)">入住：6 月 10 日星期二，15:00 可入住</li>
                <li class="relative pl-4 before:(absolute content-[''] h-full w-1 bg-neutral-60 rounded-[10px] left-0)">退房：6 月 11 日星期三，12:00 前退房</li>
              </ul>
              <p class="text-subtitle font-700 md:text-title">NT$ 10,000</p>
            </div>
            <div class="divider-h-40"></div>
            <RoomBasicInfo class="space-y-10!" :show-basic-info="false" room-layout-class="border border-neutral-40 rounded-2" room-equipment-class="border border-neutral-40 rounded-2"
            room-amenity-class="border border-neutral-40 rounded-2" >
            </RoomBasicInfo>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IcBaselineCheck from '~icons/ic/baseline-check';
import { LuxuryButton } from '@enjoyment-luxury-hotel/shared/components'

definePageMeta({
  name: 'Client_booking_confirm',
  layout: 'client-layout',
  headerFade: false,
  props: true,
})

useSeoMeta({
  title: 'Booking Confirm'
})

const props = defineProps({
  bookingId: {
    type: String,
    required: true
  }
})

const { bookingId } = toRefs(props)
const viewport = useViewport()
const src = ref('https://res.cloudinary.com/drhaq32ec/image/upload/v1734227834/enjoyment-luxury-hotel/tq1yatqmd5e6bcu36cgz.png')

const size= computed(() => viewport.isLessOrEquals('md') ? 24 : 40)

</script>

<style scoped>

</style>