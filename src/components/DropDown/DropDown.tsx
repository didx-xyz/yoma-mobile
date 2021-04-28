import { Optional } from 'components'
import Text, { MetaLevels, TextAlign } from 'components/Typography'
import React from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors } from 'styles'

import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  isTouched?: boolean
  error?: string
  fieldName?: string
  showTitle?: boolean
}

const DropDown = ({ isTouched, error, fieldName, showTitle = false, ...props }: Props) => {
  return (
    <View>
      <Optional condition={showTitle}>
        <Text.Meta level={MetaLevels.small} style={styles.label}>
          {fieldName}
        </Text.Meta>
      </Optional>
      <DropDownPicker
        containerStyle={styles.container}
        style={styles.dropDown}
        dropDownStyle={styles.dropDownView}
        itemStyle={styles.item}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} align={TextAlign.center}>
        {isTouched && error}
      </Text.Meta>
    </View>
  )
}

export default DropDown
