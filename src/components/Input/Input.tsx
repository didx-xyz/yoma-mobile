import React from 'react'
import { Text, TextInput, TextInputProps, View } from 'react-native'
import { TextStyles } from 'styles'

import styles from './Input.styles'

type InputProps = TextInputProps & {
  label: string,
  touched?: boolean,
  error?: any
};

const Input = ({
  label,
  touched,
  error,
  ...props
}: InputProps) => {
  return (
    <View>
      <TextInput placeholder={label}
        style={[styles.textInputStyle, TextStyles.h4, TextStyles.textTertiary5]} {...props} />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  );
};

export default Input
