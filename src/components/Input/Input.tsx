import { useField } from 'formik'
import React from 'react'
import { Keyboard, TextInput, TextInputProps, View } from 'react-native'

import InputError from '~/components/InputError'
import Text, { MetaLevels } from '~/components/Typography'
import { Colors, colors } from '~/styles'

import styles from './Input.styles'

type Props = TextInputProps & {
  name: string
  label: string
}

const Input = ({ name, label, ...props }: Props) => {
  const [{ value }, { error }, { setValue }] = useField(name)
  return (
    <View style={styles.container}>
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
      <InputError error={error} />
    </View>
  )
}

export default Input
