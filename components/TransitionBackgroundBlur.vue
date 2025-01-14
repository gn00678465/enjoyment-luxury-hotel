<template>
  <transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 bg-black/40 backdrop-filter backdrop-blur-md">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const { show } = toRefs(props)

const updateBodyScroll = (show: boolean) => {
  if (import.meta.client) {
    document.body.style.overflow = show ? 'hidden' : ''
  }
}


watch(show, (_show) => {
  updateBodyScroll(_show)
})

onUnmounted(() => {
  updateBodyScroll(false)
})

</script>

<style scoped>

</style>