import { FormikErrors, FormikTouched } from 'formik'
import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { colors, Colors } from 'styles'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './CustomInput.styles'

type InputProps = TextInputProps & {
  label: string
  isTouched?: boolean | FormikTouched<any> | FormikTouched<any>[]
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[]
  showTitle?: boolean
}

const CustomInput = ({ label, isTouched, error, showTitle = true, ...props }: InputProps) => {
  return (
    <View>
      <Optional condition={showTitle}>
        <Text.Meta level={MetaLevels.small}>{label}</Text.Meta>
      </Optional>
      <TextInput
        placeholderTextColor={colors[Colors.MenuGrey]}
        placeholder={label}
        style={styles.textInput}
        {...props}
      />
      <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Center}>
        {isTouched && error}
      </Text.Meta>
    </View>
  )
}

export default CustomInput
