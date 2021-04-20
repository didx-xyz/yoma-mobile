import { Optional } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { colors, Colors } from 'styles'

import styles from './CustomInput.styles'

type InputProps = TextInputProps & {
  label: string
  touched?: boolean
  error?: string
  showTitle?: boolean
}

const CustomInput = ({ label, touched, error, showTitle = true, ...props }: InputProps) => {
  return (
    <View>
      <Optional condition={showTitle}>
        <Text.Meta level={MetaLevels.small}>{label}</Text.Meta>
      </Optional>
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
