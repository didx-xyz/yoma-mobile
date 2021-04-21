import React from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  touched?: boolean
  error?: string
  fieldName?: string
  showTitle?: boolean
}

const DropDown = ({ touched, error, fieldName, showTitle = false, ...props }: Props) => {
  return (
    <View>
      <Optional condition={showTitle}>
        <Text.Meta level={MetaLevels.small} style={styles.label}>
          {fieldName}
        </Text.Meta>
      </Optional>
      <DropDownPicker
        containerStyle={styles.container}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
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
