import Text, { MetaLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { colors, Colors } from 'styles'

import styles from './CustomInput.styles'

type InputProps = TextInputProps & {
  label: string
  touched?: boolean
  error?: any
  showTitle?: boolean
}

const CustomInput = ({ label, touched, error, showTitle = true, ...props }: InputProps) => {
  return (
    <View style={styles.textInputView}>
      {showTitle ? (
        <Text.Meta level={MetaLevels.small} style={styles.label}>
          {label}
        </Text.Meta>
      ) : null}
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
