import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AnswerComponent from '../components/AnswerComponent.vue'

describe('AnswerComponent', () => {
  const defaultProps = {
    image: '/src/assets/test.png',
    index: 0,
    selected: null,
    correct: 1,
    isAnswered: false,
  }

  it('renders image', () => {
    const wrapper = mount(AnswerComponent, {
      props: defaultProps,
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('/src/assets/test.png')
  })

  it('applies correct class when answer is correct', async () => {
    const wrapper = mount(AnswerComponent, {
      props: {
        ...defaultProps,
        isAnswered: true,
        selected: 1,
        correct: 1,
        index: 1,
      },
    })
    expect(wrapper.find('.image-wrapper').classes()).toContain('correct')
  })

  it('applies wrong class when answer is wrong', async () => {
    const wrapper = mount(AnswerComponent, {
      props: {
        ...defaultProps,
        isAnswered: true,
        selected: 0,
        correct: 1,
        index: 0,
      },
    })
    expect(wrapper.find('.image-wrapper').classes()).toContain('wrong')
  })

  it('shows checkmark for correct answer', async () => {
    const wrapper = mount(AnswerComponent, {
      props: {
        ...defaultProps,
        isAnswered: true,
        selected: 1,
        correct: 1,
        index: 1,
      },
    })
    expect(wrapper.find('.correct-icon').exists()).toBe(true)
  })

  it('shows X for wrong answer', async () => {
    const wrapper = mount(AnswerComponent, {
      props: {
        ...defaultProps,
        isAnswered: true,
        selected: 0,
        correct: 1,
        index: 0,
      },
    })
    expect(wrapper.find('.wrong-icon').exists()).toBe(true)
  })
})
