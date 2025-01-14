<template>
  <div class="pt-[var(--h-header)] bg-primary-tint h-full">
    <ClientOnly v-if="viewport.isLessThan('md')">
      <Carousel height="250px" :options="{ navigation: false }">
      </Carousel>
    </ClientOnly>
    <div v-else class="p-20">
      image
    </div>
    <div class="flex-container py-10 md:py-30">
      <div class="row">
        <div class="col space-y-6 md:(col-7 space-y-20)">
          <div>
            <h3 class="text-h3 mb-4">尊爵雙人房</h3>
            <p class="text-body text-neutral-80">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
          </div>
          <RoomInfoLabel label="房型基本資訊">
            <div class="flex items-center gap-x-4">
            <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40 bg-white"></div>
            <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40 bg-white"></div>
            <div class="w-24 h-24 border-1 rounded-2 p-4 border-primary-40 bg-white"></div>
          </div>
          </RoomInfoLabel>

          <RoomInfoLabel label="房間格局">
            <div class="p-6 bg-white rounded-2">
              11111
            </div>
          </RoomInfoLabel>

          <RoomInfoLabel label="房內設備">
            <div class="p-6 bg-white rounded-2">
              11111
            </div>
          </RoomInfoLabel>

          <RoomInfoLabel label="備品提供">
            <div class="p-6 bg-white rounded-2">
              11111
            </div>
          </RoomInfoLabel>

          <RoomInfoLabel label="訂房須知">
            <ol class="list-decimal pl-6">
              <li>入住時間為下午3點，退房時間為上午12點。</li>
              <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
              <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
              <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
              <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
              <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
              <li>我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
              <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
              <li>我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
              <li>為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
            </ol>
          </RoomInfoLabel>
          <div>

          </div>
        </div>
        <div class="hidden md:(col block ml-12)">
          <div class="bg-white p-10 w-full rounded-5 space-y-10">
            <h6 class="border-b text-h5 border-neutral-40 pb-4">預訂房型</h6>
            <div>
              <h2 class="text-h2 font-700 mb-2">尊爵雙人房</h2>
              <p class="text-body">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
            </div>
            <div class="space-y-4">
              <FloatingDatePicker></FloatingDatePicker>
              <div class="flex items-center justify-between">
                <p class="text-title font-700">人數</p>
                <Counter></Counter>
              </div>
            </div>
            <h5 class="text-h5 font-700 text-primary">NT$ {{ $n(10000) }}</h5>
            <LuxuryButton block>立即預訂</LuxuryButton>
          </div>
        </div>
      </div>
    </div>
    <FloatingPaymentBar v-if="viewport.isLessThan('md')"></FloatingPaymentBar>
  </div>
</template>

<script setup lang="ts">
import { LuxuryButton } from '@enjoyment-luxury-hotel/shared/components'

definePageMeta({
  name: 'Client_Room:Id',
  layout: 'client-layout',
  headerFade: false
})


useSeoMeta({
  title: 'Room ID'
})

const viewport = useViewport()

</script>

<style scoped>

</style>