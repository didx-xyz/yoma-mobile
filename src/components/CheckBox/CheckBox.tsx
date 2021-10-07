import React from 'react'
import { Pressable, View } from 'react-native'

import { BlueHollowCircle, BlueTick } from '~/assets/images'
import { Colors } from '~/styles'

import Optional from '../Optional'
import Text from '../Typography'
import { DEFAULT_OPACITY_VALUE, LOW_OPACITY_VALUE } from './CheckBox.constants'
import styles from './CheckBox.styles'

type Props = {
  label: string | React.ReactNode
  isChecked: boolean
  onPress: () => void
}

const CheckBox = ({ label, isChecked, onPress }: Props) => {
  return (
    <Pressable
      hitSlop={20}
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? LOW_OPACITY_VALUE : DEFAULT_OPACITY_VALUE,
        },
        styles.container,
      ]}
    >
      <View style={styles.checkBox}>
        <Optional condition={isChecked} fallback={<BlueHollowCircle />}>
          <BlueTick />
        </Optional>
      </View>
      <Text.Body color={Colors.MenuGrey}>{label}</Text.Body>
    </Pressable>
  )
}

export default CheckBox
