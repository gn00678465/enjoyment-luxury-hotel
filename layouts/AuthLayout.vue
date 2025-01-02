<template>
  <div class="flex items-center flex-col md:flex-row w-full h-full bg-body relative">
    <NuxtImg
      class="flex-1 w-1/2 h-full object-cover hidden md:inline-block"
      :src="imageSrc"
      sizes="50vw sm:50vw md:50vw"
      fit="contain"
    />
    <div class="flex-1 w-full md:w-1/2 h-full">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AuthLayout',
});

const imageSrc = 'https://res.cloudinary.com/drhaq32ec/image/upload/v1734387434/enjoyment-luxury-hotel/mawmicdwcmkjufogmfcq.png';
</script>

<style scoped>

</style>
