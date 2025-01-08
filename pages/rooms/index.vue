<template>
  <div class="bg-primary-40">
    <ClientOnly>
      <Carousel height="466px md:800px" :options="{ navigation: false }">
        <template v-for="i of 5" :key="i">
          <picture>
            <source :srcset="heroSmImg" media="(max-width: 600px)" />
            <NuxtImg :src="heroImg" fit="cover" class="w-full h-full object-cover"></NuxtImg>
          </picture>
        </template>
      </Carousel>
    </ClientOnly>
    <div class="flex-container py-10 md:(pt-30 pb-40)">
      <div class="mb-10 md:mb-20">
        <p class="text-subtitle mb-2 md:(text-h6 mb-4)">房型選擇</p>
        <h3 class="text-h3 text-primary md:text-h1">各種房型，任您挑選</h3>
      </div>
      <div class="row space-y-6 md:space-y-12">
        <div class="col-12">
          <RoomCard></RoomCard>
        </div>
        <div class="col-12">
          <RoomCard></RoomCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  name: 'ClientRooms',
  layout: 'client-layout'
})

const heroImg = 'https://res.cloudinary.com/drhaq32ec/image/upload/v1734235491/enjoyment-luxury-hotel/qfvsnhmazubqb8w7rae5.png'
const heroSmImg = 'https://res.cloudinary.com/drhaq32ec/image/upload/v1734235491/enjoyment-luxury-hotel/t4mevjqyr21bmdqjg0w7.png'

const viewport = useViewport()
const breakpoints = computed(() => Object.fromEntries(Object.entries(viewport.queries.value).map(([k, v]) => [k, (v as { size: number }).size])))

</script>

<style scoped>

</style>