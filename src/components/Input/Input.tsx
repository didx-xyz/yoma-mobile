import { useField } from 'formik'
import React from 'react'
import { Keyboard, TextInput, TextInputProps } from 'react-native'

import { Colors, colors } from '~/styles'

import InputError from '../InputError'
import Text, { MetaLevels } from '../Typography'
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
      <InputError touched={touched} error={error} />
    </>
  )
}

export default Input
