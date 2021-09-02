import { cleanup, render } from '@testing-library/react-native'
import React from 'react'
import 'react-native'

import { Colors, colors } from '../../styles'
import Text from './Text'
import { FontWeights, TextAlign } from './Text.types'

describe('Text', () => {
  afterEach(cleanup)

  it('should render correctly', () => {
    const { toJSON } = render(<Text>Tester</Text>)
    const componentAsJSON = toJSON()

    expect(componentAsJSON).toMatchSnapshot()
  })

  it('should have the text button defined', () => {
    const { getByTestId } = render(<Text>Tester</Text>)
    const foundTextElement = getByTestId('text')

    expect(foundTextElement).toBeDefined()
  })

  it('should correctly fallback to the default presets for color, textAlign and fontWeight if none is set', () => {
    const { getByTestId } = render(<Text>Tester</Text>)
    const foundTextElement = getByTestId('text')
    expect(foundTextElement.props.style.color).toBe(colors[Colors.PrimaryPurple])
    expect(foundTextElement.props.style.textAlign).toBe(TextAlign.left)
    expect(foundTextElement.props.style.fontWeight).toBe('500')
  })
  it('should correctly set the text color given with the color prop', () => {
    const { getByTestId } = render(<Text color={Colors.PrimaryYellow}>Tester</Text>)
    const foundTextElement = getByTestId('text')
    expect(foundTextElement.props.style.color).toBe(colors[Colors.PrimaryYellow])
  })

  it('should correctly set the text align given with the align prop', () => {
    const { getByTestId } = render(<Text align={TextAlign.right}>Tester</Text>)
    const foundTextElement = getByTestId('text')
    expect(foundTextElement.props.style.textAlign).toBe(TextAlign.right)
  })

  it('should correctly set the font weight with the weight prop', () => {
    const { getByTestId } = render(<Text weight={FontWeights.semiBold_600}>Tester</Text>)
    const foundTextElement = getByTestId('text')
    expect(foundTextElement.props.style.fontWeight).toBe('600')
  })

  it('should correctly set the style overrides when the style prop is set', () => {
    const { getByTestId } = render(<Text style={{ color: '#ffffff' }}>Tester</Text>)
    const foundTextElement = getByTestId('text')
    expect(foundTextElement.props.style.color).toBe('#ffffff')
  })

  it('should correctly pass a prop through to the underlying component', () => {
    const { getByTestId } = render(<Text numberOfLines={3}>Tester</Text>)
    const foundTextElement = getByTestId('text')
    expect(foundTextElement.props.numberOfLines).toBe(3)
  })
})
