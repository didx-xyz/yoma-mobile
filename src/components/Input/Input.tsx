import { FormikProps, FormikValues } from 'formik'
import React from 'react'
import { Keyboard, TextInput, TextInputProps } from 'react-native'
import { colors, Colors } from 'styles'

import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './Input.styles'

type Props = TextInputProps & {
  name: string
  label: string
  handlers: FormikProps<FormikValues>
}

const Input = ({ name, label, handlers, ...props }: Props) => {
  const { handleChange, handleBlur, values, errors, touched } = handlers
  return (
    <>
      <Text.Meta level={MetaLevels.small}>{values[name] !== '' ? label : ' '}</Text.Meta>
      <TextInput
        placeholderTextColor={colors[Colors.MenuGrey]}
        placeholder={label}
        onSubmitEditing={Keyboard.dismiss}
        style={styles.textInput}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...props}
      />
      <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
        {errors[name] && touched[name] ? errors[name] : ' '}
      </Text.Meta>
    </>
  )
}

export default Input
