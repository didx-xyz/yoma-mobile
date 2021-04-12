import React from 'react'
import { Text, View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { TextStyles } from 'styles'

import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  touched?: boolean
  error?: any
}

const DropDown = ({ touched, error, ...props }: Props) => {
  return (
    <View>
      <DropDownPicker
        containerStyle={styles.container}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={styles.itemStyle}
        {...props}
      />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  )
}

export default DropDown
