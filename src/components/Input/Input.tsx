import { useField } from 'formik'
import React from 'react'
import { Keyboard, TextInput, TextInputProps } from 'react-native'

import { Colors, colors } from '~/styles'

import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './Input.styles'

type Props = TextInputProps & {
  name: string
  label: string
}

const Input = ({ name, label, ...props }: Props) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name)

  return (
    <>
      <Text.Meta level={MetaLevels.Small}>{value !== '' ? label : ' '}</Text.Meta>
      <TextInput
        placeholderTextColor={colors[Colors.MenuGrey]}
        placeholder={label}
        onSubmitEditing={Keyboard.dismiss}
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        {...props}
      />
      <Text.Meta color={Colors.PrimaryRed} align={TextAlign.Right}>
        {error && touched ? error : ' '}
      </Text.Meta>
    </>
  )
}

export default Input
