import React from 'react'
import { Text, TextInput, TextInputProps, View, TextStyle, ViewStyle } from 'react-native'
import { TextStyles } from 'styles'

import styles from './CustomInput.styles'

type InputProps = TextInputProps & {
  label: string
  touched?: boolean
  error?: any
  inputStyle?: TextStyle
  viewStyle?: ViewStyle
  showTitle?: boolean
}

const CustomInput = ({ label, touched, error, inputStyle, viewStyle, showTitle = true, ...props }: InputProps) => {
  return (
    <View style={[{ width: '95%', alignSelf: 'center' }, viewStyle]}>
      {showTitle ? <Text style={[TextStyles.h4, styles.label]}>{label}</Text> : null}
      <TextInput
        placeholder={label}
        style={[styles.textInputStyle, TextStyles.h4, TextStyles.textTertiary5, inputStyle]}
        {...props}
      />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  )
}

export default CustomInput
