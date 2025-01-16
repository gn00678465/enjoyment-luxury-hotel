<script setup lang="ts">
import { computed, type HTMLAttributes, type InputHTMLAttributes, toRefs } from 'vue';
import LuxuryLabel from './LuxuryLabel.vue'
import { parseSpacingToCSSVar } from 'vue-materials/utils';

defineSlots<{
  label: () => any;
  default: () => any;
}>();

const props = withDefaults(defineProps<LuxuryInputProps>(), {
  required: false,
  placeholder: 'Placeholder',
  status: undefined,
  showFeedback: true,
  showLabel: true,
  type: 'text',
  id: undefined
});

const modelValue = defineModel<string | null>('value', { default: null });

const { themeOverrides, label, status, placeholder, required, showLabel, showFeedback, type, id, labelClass } = toRefs(props);

const styles = computed(() => {
  const _themeOverride: ThemeOverride = Object.assign({
    padding: '16px',
    borderRadius: '8px',
  }, themeOverrides.value?.padding || {});
  const _padding = parseSpacingToCSSVar(_themeOverride.padding);
  return {
    ..._padding,
    '--border-radius': _themeOverride.borderRadius,
    '--border-width': '1px',
    '--color': 'var(--un-colors-neutral-0)',
  };
});

function setClassName(): string[] {
  if (status.value === 'error') return ['border-error'];
  return ['focus:border-primary', 'focus:ring', 'focus:ring-primary-40', 'focus:text-neutral-80'];
}

const className = computed(setClassName);
</script>

<script lang="ts">
export interface LuxuryInputProps {
  themeOverrides?: Partial<ThemeOverride>;
  label?: string
  labelClass?: HTMLAttributes['class']
  status?: 'error';
  placeholder?: string;
  required?: boolean;
  showFeedback?: boolean;
  showLabel?: boolean;
  type?: InputHTMLAttributes['type']
  id?: string
}

type ThemeOverride = {
  padding: string;
  borderRadius: string;
};
</script>

<template>
  <div
    :style="styles"
    class="space-y-2"
  >
    <div
      v-if="showLabel"
      class="text-subtitle md:text-title flex items-center"
    >
      <LuxuryLabel :label="label" :for="id" :label-class="labelClass" />
      <span
        v-if="required"
        class="flex-shrink-0 ml-auto text-primary"
      >required</span>
    </div>
    <div>
      <input
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        name="inputname"
        class="luxury-input text-body2 md:text-body block w-full outline-none border text-neutral-80  placeholder:text-neutral-40"
        :class="className"
        :id="id"
      >
    </div>
    <p
      v-if="showFeedback"
      class="text-subtitle text-error visible"
      :class="status === 'error' ? 'visible': 'invisible'"
    >
      Some Description
    </p>
  </div>
</template>

<style scoped>
</style>
