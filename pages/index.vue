<template>
  <div>
    <ClientOnly>
      <Carousel height="100dvh md:100vh" :options="{ navigation: false, autoplay: true }">
        <template v-for="i of 5" :key="i">
          <picture>
            <source :srcset="heroSmImg" media="(max-width: 600px)" />
            <NuxtImg :src="heroImg" fit="cover" class="w-full h-full object-cover"></NuxtImg>
          </picture>
        </template>
      </Carousel>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">


const heroImg = 'https://res.cloudinary.com/drhaq32ec/image/upload/v1734235491/enjoyment-luxury-hotel/qfvsnhmazubqb8w7rae5.png'
const heroSmImg = 'https://res.cloudinary.com/drhaq32ec/image/upload/v1734235491/enjoyment-luxury-hotel/t4mevjqyr21bmdqjg0w7.png'

</script>

<style scoped>

</style>