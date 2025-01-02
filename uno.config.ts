import { defineConfig, transformerVariantGroup, transformerCompileClass, presetMini } from 'unocss';
import { presetShared, presetSharedRules } from '@enjoyment-luxury-hotel/shared/unocss';

export default defineConfig({
  presets: [
    presetMini({ dark: 'class' }),
    presetShared({
      breakpoints: {
        'xs': '375px',
        'sm': '576px',
        'md': '768px',
        'lg': '992px',
        'xl': '1200px',
        '2xl': '1400px',
        '3xl': '1537px',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  rules: [
    ...presetSharedRules,
  ],
});
