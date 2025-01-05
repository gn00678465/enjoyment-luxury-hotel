<template>
  <div class="flex-container" :style="styles">
    <slot></slot>
  </div>
</template>

<script setup lang="ts" generic="Breakpoint extends string">

const props = withDefaults(defineProps<FlexContainerProps<Breakpoint>>(), {
  gutter: 24,
  fluid: false,
  feature: 'minWidth',
  breakpoints: undefined,
  cols: 12
})
const { gutter, feature, breakpoints, cols } = toRefs(props)
const styles = reactive({
  '--gutter-x': (gutter.value / 2) + 'px'
})

const widthSetting = feature.value === 'minWidth' ? 'min-width' : 'max-width'

function generateCss(breakpoints?: Record<Breakpoint, number>, feature?: "minWidth" | "maxWidth", cols?: number) {
  let styles = `
    .flex-container {
      width: 100%;
      padding-right: var(--gutter-x, .75rem);
      padding-left: var(--gutter-x, .75rem);
      margin-right: auto;
      margin-left: auto;
    }
  `;

  if (breakpoints && feature === 'minWidth') {
    // 按照斷點值從大到小排序
    const sortedBreakpoints = Object.entries(breakpoints)
      .sort(([, a], [, b]) => (a as number) - (b as number));

    const mediaQueries = sortedBreakpoints.map(([key, value]) => `
      @media (${widthSetting}: ${value}px) {
        .flex-container {
          max-width: ${value}px;
        }

        ${generateColumns(cols)}
      }
    `).join('\n');

    styles =  mediaQueries + styles
  }

  if (breakpoints && feature === 'maxWidth') {
    // 按照斷點值從小到大排序
    const sortedBreakpoints = Object.entries(breakpoints)
      .sort(([, a], [, b]) => (a as number) - (b as number));

    const mediaQueries = sortedBreakpoints.map(([key, value]) => `
      @media screen and (${widthSetting}: ${value}px) {
        .flex-container {
          max-width: ${value}px;
        }

        ${generateColumns(cols)}
      }
    `).join('\n');

    styles =  styles + mediaQueries
  }

  return styles;
}

function generateColumns(cols?: number) {
  const base = `
  .col {
    flex: 1 0 0%;
  }
  `
  const other = cols ? [...new Array(cols)].map((_, idx) => `
  .col-${idx + 1} {
    flex: 0 0 auto;
    width: ${(100 / cols) * (idx + 1)}%;
  }
  `).join('\n') : ''

  return base + other
}

function addToGlobal() {
  const style = document.querySelector(`#flex-container`) || document.createElement('style');
  style.id = 'flex-container'
  style.textContent = generateCss(breakpoints.value, feature.value, cols.value);
  document.head.appendChild(style);
}

onMounted(() => {
  addToGlobal()
})

provide<FlexContainerProvide<Breakpoint>>(flexContainerSymbol, {
  gutter: gutter.value,
  breakpoints: breakpoints.value
})

</script>

<script lang="ts">
export interface FlexContainerProps<Breakpoint extends string> {
  fluid?: boolean
  gutter?: number
  breakpoints?: Record<Breakpoint, number>
  feature?: "minWidth" | "maxWidth"
  cols?: number
}

export interface FlexContainerProvide<Breakpoint extends string> {
  gutter: number
  breakpoints: Record<Breakpoint, number>
}

export const flexContainerSymbol = Symbol('flexContainer')

</script>

<style scoped>
</style>