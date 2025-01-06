<template>
  <div :class="spanClass">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<FlexColProps>(), {
  span: undefined
})
const { span } = toRefs(props)

type InputValue = string | number;
type ClassNamePrefix = string;
type Transformer = (value: string | number) => string;

interface ClassNameProcessorConfig {
  prefix: ClassNamePrefix;
  transformer?: Transformer;
}

class ClassNameProcessor {
  private prefix: string
  private transformer: (value: string | number) => string

  constructor({
    prefix,
    transformer = (v: string | number) => `${prefix}-${v}`
  }: ClassNameProcessorConfig) {
    this.prefix = prefix
    this.transformer = transformer
  }

  /**
   * 處理單一值
   */
  private processValue(value: InputValue): string {
    return this.transformer(value);
  }

  /**
   * 處理響應式值
   */
  process(value: InputValue): string {
    // 處理數字或非響應式字串
    if (typeof value === 'number' || !String(value).includes(' ')) {
      return this.processValue(value);
    }

    // 處理響應式字串
    return String(value)
      .split(' ')
      .map(part => {
        // 檢查是否包含斷點
        if (part.includes(':')) {
          const [breakpoint, val] = part.split(':');
          return `${breakpoint}:${this.processValue(val)}`;
        }
        return this.processValue(part);
      })
      .join(' ');
  }
}

const createClassNameProcessor = new ClassNameProcessor({
  prefix: 'col'
})

const spanClass = computed(() => span.value ? createClassNameProcessor.process(span.value) : undefined)

</script>

<script lang="ts">
export interface FlexColProps {
  span?: number | string
}


</script>

<style scoped></style>