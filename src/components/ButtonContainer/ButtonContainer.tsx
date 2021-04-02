import React from 'react'
import { Text, TextStyle, TouchableOpacityProps, TouchableOpacity, ViewStyle } from 'react-native'

import { WithChildren } from 'types/react.types'

type Props = TouchableOpacityProps & WithChildren<{
  buttonStyle: ViewStyle[] | ViewStyle;
  buttonText: string | number;
  buttonTextStyle: TextStyle[] | TextStyle;
  onPress: () => void;
}>

const ButtonContainer = ({
  children,
  buttonStyle,
  buttonText,
  buttonTextStyle,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={buttonStyle}
      {...props}
    >
      {children}
      <Text style={buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default ButtonContainer
