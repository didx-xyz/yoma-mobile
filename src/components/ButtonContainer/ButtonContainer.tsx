import React from 'react'
import { TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { WithChildren } from 'types/react.types'

import Text, { FontWeights } from '../Typography'

type Props = TouchableOpacityProps &
  WithChildren<{
    buttonStyle: ViewStyle[] | ViewStyle
    buttonText: string | number
    buttonTextStyle: TextStyle[] | TextStyle
    onPress: () => void
  }>

const ButtonContainer = ({ children, buttonStyle, buttonText, buttonTextStyle, ...props }: Props) => {
  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      {children}
      <Text.Body weight={FontWeights.bold_700} style={buttonTextStyle}>
        {buttonText}
      </Text.Body>
    </TouchableOpacity>
  )
}

export default ButtonContainer
