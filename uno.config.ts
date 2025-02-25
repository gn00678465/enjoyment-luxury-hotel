import { defineConfig, transformerVariantGroup, transformerCompileClass, presetUno } from 'unocss';
import { presetShared, presetSharedRules } from './packages/shared/libs/unocss';
import { presetGrid } from 'uno-preset-grid'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
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
    presetGrid({
      lengthUnit: 'rem',
      baseFontSize: 16,
      breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        xxl: '1400px'
      },
      maxWidth: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        xxl: '1320px'
      }
    })
  ],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass(),
  ],
  rules: [
    ...presetSharedRules
  ],
  shortcuts: [
    [
      /^divider-(v|h)-?(\d+)$/, ([, d, n]) => {
        const num = [10, 40, 60, 800, 100]
        if (d === 'h' && num.includes(parseInt(n))) {
          return `h-[1px] w-auto bg-neutral-${n}`
        }
        if (d === 'v' && num.includes(parseInt(n))) {
          return `w-[1px] h-full bg-neutral-${n}`
        }
        return ''
      }
    ]
  ]
});
