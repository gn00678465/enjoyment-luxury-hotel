import { defineConfig, presetUno } from 'unocss'
import { presetShared } from '@enjoyment-luxury-hotel/shared/unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: 'class' }),
    presetShared()
  ]
})
