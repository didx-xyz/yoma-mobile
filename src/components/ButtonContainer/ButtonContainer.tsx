import React from 'react'
import { TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import { Colors } from 'styles'
import { WithChildren } from 'types/react.types'

import Text, { Bold } from '../Typography'

type Props = TouchableOpacityProps &
  WithChildren<{
    buttonStyle: ViewStyle[] | ViewStyle
    buttonText: string | number
    buttonTextStyle?: TextStyle[] | TextStyle
    buttonTextColor?: Colors
    onPress: () => void
  }>

const ButtonContainer = ({
  children,
  buttonStyle,
  buttonText,
  buttonTextColor = Colors.white,
  buttonTextStyle,
  ...props
}: Props) => {
  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      {children}
      <Text.Body style={buttonTextStyle}>
        <Bold color={buttonTextColor}>{buttonText}</Bold>
      </Text.Body>
    </TouchableOpacity>
  )
}

export default ButtonContainer
