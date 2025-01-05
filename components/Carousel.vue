<template>
  <swiper-container :style="styles" class="h-[var(--height)] relative" init="false" ref="containerRef">
    <swiper-slide v-for="(slid, idx) of slides" :key="idx">
      <component :is="slid"></component>
    </swiper-slide>
  </swiper-container>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { SwiperContainer } from 'swiper/element'

const slots = defineSlots<{
  default: () => any
}>()
const props = defineProps({
  aspectRatio: {
    type: [String, Number],
    default: undefined
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  /**
   * 800
   * 800px
   * 466px md:800px
   */
  height: {
    type: [String, Number],
    default: 'auto'
  },
  options: {
    type: Object as PropType<SwiperContainer['swiper']['params']>,
    default: () => ({})
  },
  showMark: {
    type: Boolean,
    default: true
  },
  maskColor: {
    type: String,
    default: 'rgba(0,0,0,0.6)'
  }
})
const { options, width, height, aspectRatio, showMark, maskColor } = toRefs(props)
const viewport = useViewport()


const containerRef = ref<SwiperContainer | null>(null)
const slides = renderSlotFragments(slots.default?.())
const styles = reactive({
  '--width': computed(() => getSize(width.value)),
  '--height': computed(() => getSize(height.value)),
  '--aspect-ratio': computed(() => getResponsiveValue(aspectRatio?.value)),
  '--mask-background': maskColor.value
})

function getSize(s: number | string) {
  const map = processSize(s, ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'])
  let result = map.get('default')
  for (const [k, v] of map.entries()) {
    if (viewport.match(k)) {
      result = v
    }
  }
  return result
}

function getResponsiveValue(s?: number | string) {
  if (!s) return undefined
  const map = createResponsiveValue(s, ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'])
  let result = map.get('default')
  for (const [k, v] of map.entries()) {
    if (viewport.match(k)) {
      result = v
    }
  }
  return result
}

const swiperOptions = computed<SwiperContainer['swiper']['params']>(() => {
  return Object.assign({
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: true,
    navigation: true,
    injectStyles: [
      `
      .swiper .swiper-button-prev,
      .swiper .swiper-button-next {
        width: 56px;
        height: 56px;
        background-color: #FFFFFF;
        color: #4B4B4B;
        border-radius: 100px;
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center;
      }

      @media (max-width: 768px) { 
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }
      }

      .swiper-button-next svg,
      .swiper-button-prev svg{
        width: 15%;
      }

      .swiper .swiper-button-prev::after,
      .swiper .swiper-button-next::after {
        font-size: 40px;
      }

      .swiper .swiper-button-prev::after {
        display: inline-block;
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
      }

      .swiper .swiper-button-next::after {
        display: inline-block;
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
      }

      .swiper .swiper-pagination {
        bottom: 24px;
      }

      .swiper .swiper-pagination-bullet {
        width: 32px;
        height: 4px;
        background-color: #F1EAE4;
        border-radius: 100px;
        opacity: 1;
      }

      .swiper .swiper-pagination-bullet-active {
        width: 60px;
        background-color: rgb(var(--un-colors-primary-DEFAULT));
      }

      `,
      showMark.value && `
      .swiper::after {
        content: '';
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: var(--mask-background);
        z-index: 1;
        user-select: none;
      }
      `
    ].filter(Boolean),
    injectStylesUrls: []
  }, options.value)
})

function initialize() {
  if (containerRef.value) {
    Object.assign(containerRef.value, swiperOptions.value)
    containerRef.value?.initialize()
  }
}

onMounted(() => nextTick(() => initialize()))

</script>

<style scoped>

</style>