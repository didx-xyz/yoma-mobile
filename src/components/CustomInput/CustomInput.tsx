import React from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { TextStyles } from 'styles'

import styles from './CustomInput.styles'

type InputProps = TextInputProps & {
  label: string
  touched?: boolean
  error?: any
}

const CustomInput = ({ label, touched, error, ...props }: InputProps) => {
  return (
    <View style={{ width: '95%', alignSelf: 'center' }}>
      <Text style={[TextStyles.h4, styles.label]}>{label}</Text>
      <TextInput
        placeholder={label}
        style={[styles.textInputStyle, TextStyles.h4, TextStyles.textTertiary5]}
        {...props}
      />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  )
}

export default CustomInput
