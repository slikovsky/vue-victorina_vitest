import { config } from '@vue/test-utils'

// Мок для изображений
config.global.stubs = {
  img: {
    template: '<img :src="src" />',
    props: ['src'],
  },
}
