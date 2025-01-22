<template>
  <div class="relative flex flex-col h-full" :style="styles">
    <AppHeader ref="appHeaderRef" class="fixed top-0 left-0 right-0 z-10 flex-shrink-0" :fade="(route.meta.headerFade as boolean | undefined)" />
    <main class="bg-body h-fit flex-grow-1 pt-[var(--h-header)]">
      <div class="relative h-[206px] md:(h-96)">
        <NuxtImg class="w-full max-h-full h-[206px] md:(h-96)" :src="src" alt="profile-hero" fit="cover" />
        <div class="absolute inset-0 w-full h-full z-1">
          <div class="flex flex-col my-10 ml-5 gap-y-4 md:(flex-row flex-container gap-y-0 gap-x-6 items-center my-30)">
            <NuxtImg class="aspect-ratio-[1/1] w-18 md:w-36" format="svg" :src="avatarSrc" fit="cover" />
            <h3 class="text-h3 text-white md:text-h1">Hello，Jessica</h3>
          </div>
        </div>
      </div>
      <div class="flex-container bg-body py-10 md:(pt-20 pb-30)">
        <div class="mb-10 md:mb-20">
          <LuxuryTabs class="flex text-subtitle text-white">
            <LuxuryTab as="button" :active="route.path === '/user/:userId/profile'"
              @click="router.push('/user/:userId/profile')">個人資料</LuxuryTab>
            <LuxuryTab as="button" :active="route.path === '/user/:userId/order'"
              @click="router.push('/user/:userId/order')">我的訂單</LuxuryTab>
          </LuxuryTabs>
        </div>
        <div class="row gap-y-6 md:(gap-y-0)">
          <div class="col-12 md:(col-5)">
            <slot name="left" />
          </div>
          <div class="col-12 md:(col ml-4)">
            <slot name="right" />
          </div>
        </div>
      </div>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup lang="ts">
import type { AppHeaderInst } from '~/components/AppHeader.vue'
import { LuxuryTabs, LuxuryTab } from '~/packages/shared/libs/components'

defineOptions({
  name: 'ClientLayout',
});

const route = useRoute()
const router = useRouter()
const appHeaderRef = ref<AppHeaderInst>()
const styles = computed(() => ({
  '--h-header': appHeaderRef.value?.height ? `${appHeaderRef.value.height}px` : undefined
}))
const src = ref('https://res.cloudinary.com/drhaq32ec/image/upload/v1737376919/enjoyment-luxury-hotel/profile-hero_uu1hxj.png')
const avatarSrc = ref('https://res.cloudinary.com/drhaq32ec/image/upload/v1737583906/enjoyment-luxury-hotel/avatar-06_lwzpnm.svg')

</script>

<style scoped>

</style>