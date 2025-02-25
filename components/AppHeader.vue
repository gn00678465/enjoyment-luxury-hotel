<script setup lang="ts">
import { LuxuryButton } from '@enjoyment-luxury-hotel/shared/components';
import IconLogo from '~icons/custom/logo';
import IcRoundClose from '~icons/ic/round-close';
import IcRoundMenu from '~icons/ic/round-menu';

defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()
const props = withDefaults(defineProps<AppHeaderProps>(), {
  showActions: true,
  fade: true
});

const { showActions, fade } = toRefs(props);
const { t } = useI18n();

const { bool: mobileCollapse, setFalse, setTrue } = useBoolean(false);
const navRef = ref<HTMLElement>()
const triggerRef = ref<HTMLElement>()
const height = ref(0)

let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined

if (import.meta.client) {
  resizeObserver = new ResizeObserver(([entry]) => {
    const rect = entry.target.getBoundingClientRect()
    height.value = rect.height
  })

  intersectionObserver = new IntersectionObserver(([entry]) => {
    if (navRef.value) {
      if (entry.isIntersecting) {
        navRef.value.classList.remove('bg-body')
        navRef.value.classList.add('bg-transparent')
      }
      else {
        navRef.value.classList.remove('bg-transparent')
        navRef.value.classList.add('bg-body')
      }
    }
  })
}

onMounted(() => {
  navRef.value && resizeObserver?.observe(navRef.value)
  fade.value && triggerRef.value && intersectionObserver?.observe(triggerRef.value)
})

onUnmounted(() => {
  navRef.value && resizeObserver?.unobserve(navRef.value)
  triggerRef.value && intersectionObserver?.unobserve(triggerRef.value)
  resizeObserver = undefined
  intersectionObserver = undefined
})

defineExpose<AppHeaderInst>({
  height: height
})

</script>

<script lang="ts">
export const appHeaderProps = {
  showActions: {
    type: Boolean,
    default: true,
  },
  fade: {
    type: Boolean,
    default: true
  }
};

export interface AppHeaderProps {
  showActions?: boolean;
  fade?: boolean;
}

export interface AppHeaderInst {
  height: Ref<number>
}
</script>

<template>
  <div ref="triggerRef" />
  <nav
    ref="navRef"
    v-bind="attrs"
    class="app-nav px-3 text-white transition-colors duration-300"
    :class="fade ? 'bg-transparent' : 'bg-body'"
  >
    <!-- desktop rwd -->
    <div class="max-w-440 mx-auto flex items-center justify-between">
      <IconLogo
        class="aspect-[196/72] h-10 w-auto md:h-auto"
      />
      <button
        class="p-2 inline-block md:hidden"
        @click="setTrue"
      >
        <IcRoundMenu
          width="24"
          height="24"
        />
      </button>
      <ul
        class="hidden md:(flex items-center gap-x-4)"
      >
        <li class="w-full md:w-auto">
          <LuxuryButton
            ghost
            :theme-overrides="{ padding: '16px' }"
            class="w-full md:w-auto"
          >
            {{ t('hotel_room') }}
          </LuxuryButton>
        </li>
        <li class="w-full md:w-auto">
          <LuxuryButton
            ghost
            :theme-overrides="{ padding: '16px' }"
            class="w-full md:w-auto"
          >
            {{ t('sign_in') }}
          </LuxuryButton>
        </li>
        <li class="w-full md:w-auto">
          <LuxuryButton
            type="primary"
            class="w-full md:w-auto"
          >
            {{ t('book_now') }}
          </LuxuryButton>
        </li>
      </ul>

      <!-- Mobile menu, show/hide based on menu state. -->
      <Teleport
        to="body"
      >
        <transition
          mode="out-in"
          enter-from-class="transform opacity-0"
          enter-to-class="transform opacity-100"
          enter-active-class="transition ease-out duration-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100"
          leave-to-class="transform opacity-0"
        >
          <div
            v-if="mobileCollapse && showActions"
            class="fixed top-0 left-0 bottom-0 right-0 bg-body md:hidden z-[998] w-full h-full"
          >
            <div class="h-full flex items-center justify-center relative">
              <button
                class="absolute top-5 right-5 p-2.5 text-white"
                @click="setFalse"
              >
                <IcRoundClose
                  width="28"
                  height="28"
                />
              </button>
              <ul
                class="w-full px-5 space-y-4 block md:hidden"
              >
                <li class="w-full md:w-auto">
                  <LuxuryButton
                    ghost
                    :theme-overrides="{ padding: '16px' }"
                    class="w-full md:w-auto"
                  >
                    {{ t('hotel_room') }}
                  </LuxuryButton>
                </li>
                <li class="w-full md:w-auto">
                  <LuxuryButton
                    ghost
                    :theme-overrides="{ padding: '16px' }"
                    class="w-full md:w-auto"
                  >
                    {{ t('sign_in') }}
                  </LuxuryButton>
                </li>
                <li class="w-full md:w-auto">
                  <LuxuryButton
                    type="primary"
                    class="w-full md:w-auto"
                  >
                    {{ t('book_now') }}
                  </LuxuryButton>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </Teleport>
    </div>
  </nav>
</template>

<style scoped>
:where(.app-nav) {
  padding-top: 1rem; /* 16px */
  padding-bottom: 1rem; /* 16px */
  background: transparent;
}
</style>
