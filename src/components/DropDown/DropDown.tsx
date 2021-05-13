import React from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors } from 'styles'

import Text, { MetaLevels, TextAlign } from '../Typography'
import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  isTouched?: boolean
  error?: string
  fieldName?: string
  showTitle?: boolean
}

const DropDown = ({ isTouched, error, fieldName, showTitle, ...props }: Props) => {
  return (
    <View>
      <Text.Meta level={MetaLevels.small}>{showTitle ? fieldName : ' '}</Text.Meta>
      <DropDownPicker
        style={styles.dropDown}
        dropDownStyle={styles.dropDownView}
        itemStyle={styles.item}
        placeholderStyle={styles.placeholder}
        globalTextStyle={styles.label}
        showArrow={false}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.right}>
        {isTouched && error}
      </Text.Meta>
    </View>
  )
}

export default DropDown
