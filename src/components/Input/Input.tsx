import { useField } from 'formik'
import React from 'react'
import { Keyboard, TextInput, TextInputProps, View } from 'react-native'

import InputError from '~/components/InputError'
import InputLabel from '~/components/InputLabel'
import { Colors, colors } from '~/styles'

import styles from './Input.styles'

type Props = TextInputProps & {
  name: string
  label: string
}

const Input = ({ name, label, ...props }: Props) => {
  const [{ value }, { error, touched }, { setValue }] = useField(name)
  return (
    <View style={styles.container}>
      <InputLabel label={label} isVisible={value !== ''} />
      <TextInput
        placeholderTextColor={colors[Colors.MenuGrey]}
        placeholder={label}
        onSubmitEditing={Keyboard.dismiss}
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        {...props}
      />
      <InputError error={error} touched={touched} />
    </View>
  )
}

export default Input
