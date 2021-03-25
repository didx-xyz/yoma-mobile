import React from 'react'
import { Text, TextStyle, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { WithChildren } from '../../types/react.types'

type Props = WithChildren<{
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
  onPress = () => { }
}: Props) => {
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
    >
      {children}
      <Text style={buttonTextStyle}>{buttonText}</Text>
    </TouchableOpacity>
  )
}

export default ButtonContainer
