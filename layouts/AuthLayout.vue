<template>
  <div class="flex items-center flex-col md:flex-row w-full bg-body relative min-h-vh h-full overflow-y-auto" :style="styles">
    <AppHeader ref="appHeaderRef" class="fixed top-0 left-0 right-0 bg-body"></AppHeader>
    <NuxtImg
      class="flex-1 w-1/2 h-full object-cover hidden md:inline-block"
      :src="imageSrc"
      sizes="50vw sm:50vw md:50vw"
      fit="contain"
    />
    <div class="flex-1 w-full md:w-1/2 h-fit pt-[var(--h-header)]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppHeaderInst } from '~/components/AppHeader.vue';

defineOptions({
  name: 'AuthLayout',
});

const imageSrc = 'https://res.cloudinary.com/drhaq32ec/image/upload/v1734387434/enjoyment-luxury-hotel/mawmicdwcmkjufogmfcq.png';

const appHeaderRef = ref<AppHeaderInst>()
const styles = computed(() => ({
  '--h-header': appHeaderRef.value?.height ? `${appHeaderRef.value.height}px` : undefined
}))
</script>

<style scoped>

</style>
