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
    <FlexContainer :breakpoints="breakpoints" :gutter="24">
      <FlexRow>
        <FlexCol span="6">
          <p class="text-h1">Rooms</p>
        </FlexCol>
        <FlexCol span="1 md:6">
          <p class="text-h1">Rooms</p>
        </FlexCol>
      </FlexRow>
    </FlexContainer>
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