<template>
  <div class="relative flex flex-col h-full" :style="styles">
    <AppHeader ref="appHeaderRef" class="fixed top-0 left-0 right-0 z-10 flex-shrink-0" :fade="(route.meta.headerFade as boolean | undefined)" />
    <main class="h-fit flex-grow-1">
      <slot></slot>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup lang="ts">
import type { AppHeaderInst } from '~/components/AppHeader.vue';

defineOptions({
  name: 'ClientLayout',
});

const route = useRoute()
const appHeaderRef = ref<AppHeaderInst>()
const styles = computed(() => ({
  '--h-header': appHeaderRef.value?.height ? `${appHeaderRef.value.height}px` : undefined
}))

</script>

<style scoped>

</style>