import Text, { TextAlign } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors, TextStyles } from 'styles'

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
        containerStyle={styles.container}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={styles.itemStyle}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {touched && error}
      </Text.Meta>
    </View>
  )
}

export default DropDown
