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
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-top: calc(var(--gutter-y)* -1);
      margin-right: calc(var(--gutter-x) / -2);
      margin-left: calc(var(--gutter-x) / -2);
      & > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(var(--gutter-x) / 2);
        padding-left: calc(var(--gutter-x) / 2);
        margin-top: var(--gutter-y);
      }
    }
  `;

  const colStyles = `
  .col {
    flex: 1 0 0%;
  }
  ${generateResponsiveColumns(cols)}
  `

  if (breakpoints && feature === 'minWidth') {
    // 按照斷點值從小到大排序
    const sortedBreakpoints = Object.entries(breakpoints)
      .sort(([, a], [, b]) => (a as number) - (b as number));

    const mediaQueries = sortedBreakpoints.map(([key, value]) => `
      @media (${widthSetting}: ${value}px) {
        .flex-container {
          max-width: ${value}px;
        }

        ${generateResponsiveColumns(cols, key)}
      }
    `).join('\n');

    styles = styles + colStyles + mediaQueries
  }

  if (breakpoints && feature === 'maxWidth') {
    // 按照斷點值從大到小排序
    const sortedBreakpoints = Object.entries(breakpoints)
      .sort(([, a], [, b]) => (b as number) - (a as number));

    const mediaQueries = sortedBreakpoints.map(([key, value]) => `
      @media screen and (${widthSetting}: ${value}px) {
        .flex-container {
          max-width: ${value}px;
        }

        ${generateResponsiveColumns(cols, key)}
      }
    `).join('\n');

    styles = styles + colStyles + mediaQueries
  }

  return styles;
}

function generateResponsiveColumns(cols?: number, prefix: string = '') {
  const other = cols ? [...new Array(cols)].map((_, idx) => `
  .${prefix ? `${prefix}\\:` : ''}col-${idx + 1} {
    flex: 0 0 auto;
    width: ${(100 / cols) * (idx + 1)}%;
  }
  `).join('\n') : ''

  return other
}

function addToGlobal() {
  const style = document.querySelector(`#flex-container`) || document.createElement('style');
  style.id = 'flex-container'
  style.textContent = generateCss(breakpoints.value, feature.value, cols.value);
  document.head.appendChild(style)
}

onBeforeMount(() => {
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

<style scoped></style>