import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { Colors, TextStyles } from 'styles'

import Text, { FontWeights, TextAlign } from '../Typography'
import styles from './Input.styles'

type InputProps = TextInputProps & {
  label: string
  isTouched?: boolean
  error?: string
}

const Input = ({ label, isTouched, error, ...props }: InputProps) => {
  return (
    <View>
      <TextInput placeholder={label} style={[styles.textInput, TextStyles.h4, TextStyles.textTertiary5]} {...props} />
      <Text.Meta color={Colors.primaryRed} weight={FontWeights.semiBold_600} align={TextAlign.center}>
        {isTouched && error}
      </Text.Meta>
    </View>
  )
}

export default Input
