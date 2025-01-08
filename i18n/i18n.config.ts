export default defineI18nConfig(() => ({
  numberFormats: {
    'zh-TW': {
      currency: {
        style: 'currency', 
        currency: 'TWD', 
        notation: 'standard'
      },
    },
    'en-US': {
      currency: {
        style: 'currency', 
        currency: 'USD', 
        notation: 'standard'
      },
    }
  },
}))
