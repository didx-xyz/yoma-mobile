import { BlueHollowCircle, BlueTick } from 'assets/images'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text from '../Typography'
import styles from './CheckBox.styles'

type Props = {
  label: string | React.ReactNode
  isChecked: boolean
  onPress: () => void
}

const CheckBox = ({ label, isChecked, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkBoxContainer}>
      <View style={styles.checkBox}>
        <Optional condition={isChecked} fallback={<BlueHollowCircle />}>
          <BlueTick />
        </Optional>
      </View>
      <Text.Body color={Colors.menuGrey}>{label}</Text.Body>
    </TouchableOpacity>
  )
}

export default CheckBox
