import { FormikProps, FormikValues, connect } from 'formik'
import React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'
import { colors, Colors } from 'styles'

import Optional from '../Optional'
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
    <View style={styles.container}>
      <Optional condition={values[name] !== ''}>
        <Text.Meta level={MetaLevels.small}>{label}</Text.Meta>
      </Optional>
      <TextInput
        placeholderTextColor={colors[Colors.menuGrey]}
        placeholder={label}
        style={styles.textInput}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        {...props}
      />
      {errors[name] && touched[name] && (
        <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
          {errors[name]}
        </Text.Meta>
      )}
    </View>
  )
}

export default connect(Input)
