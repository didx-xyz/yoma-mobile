import React from 'react'
import { Text, View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { TextStyles } from 'styles'

import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  touched?: boolean
  error?: any
  fieldName?: string
  showTitle?: boolean
}

const DropDown = ({ touched, error, fieldName, showTitle, ...props }: Props) => {
  return (
    <View>
      {showTitle ? <Text style={[TextStyles.h4, styles.label, { paddingLeft: 10 }]}>{fieldName}</Text> : null}
      <DropDownPicker
        containerStyle={{ height: 45 }}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        {...props}
      />
      <Text style={TextStyles.errorText}>{touched && error}</Text>
    </View>
  )
}

export default DropDown
