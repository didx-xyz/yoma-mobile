import Text, { MetaLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors } from 'styles'

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
      {showTitle ? (
        <Text.Meta level={MetaLevels.small} style={styles.label}>
          {fieldName}
        </Text.Meta>
      ) : null}
      <DropDownPicker
        containerStyle={styles.container}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={styles.labelStyle}
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
