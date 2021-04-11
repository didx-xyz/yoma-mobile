import React from 'react'
import { View } from 'react-native'
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker'
import { Colors, TextStyles } from 'styles'

import Text, { FontWeights, TextAlign } from '../Typography'
import styles from './DropDown.styles'

type Props = DropDownPickerProps & {
  touched?: boolean
  error?: any
}

const DropDown = ({ touched, error, ...props }: Props) => {
  return (
    <View>
      <DropDownPicker
        containerStyle={{ height: 45, marginTop: 15 }}
        style={styles.dropDownStyle}
        dropDownStyle={styles.dropDownViewStyle}
        labelStyle={[TextStyles.h4, TextStyles.textTertiary5]}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        {...props}
      />
      <Text.Meta color={Colors.primaryRed} weight={FontWeights.semiBold_600} align={TextAlign.center}>
        {touched && error}
      </Text.Meta>
    </View>
  )
}

export default DropDown
