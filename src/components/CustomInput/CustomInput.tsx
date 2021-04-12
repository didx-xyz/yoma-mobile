import Text, { TextAlign } from 'components/Typography'
import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { colors, Colors } from 'styles'

import styles from './CustomInput.styles'

type InputProps = TextInputProps & {
  label: string
  touched?: boolean
  error?: any
}

const CustomInput = ({ label, touched, error, ...props }: InputProps) => {
  return (
    <View style={styles.textInputView}>
      <Text.Meta style={styles.label}>{label}</Text.Meta>
      <TextInput
        placeholderTextColor={colors[Colors.menuGrey]}
        placeholder={label}
        style={styles.textInputStyle}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {touched && error}
      </Text.Meta>
    </View>
  )
}

export default CustomInput
