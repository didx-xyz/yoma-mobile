import { BlueHollowCircle, BlueTick } from 'assets/images'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native'
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
  const [opacity, setOpacity] = useState<number>(1)
  const [style, setStyle] = useState<ViewStyle>(styles.checkBoxContainer)

  useEffect(() => {
    const opacityStyle = { opacity: opacity }
    setStyle(StyleSheet.flatten([opacityStyle, styles.checkBoxContainer]))
  }, [opacity])

  return (
    <Pressable
      hitSlop={20}
      onPress={onPress}
      onPressIn={() => setOpacity(0.2)}
      onPressOut={() => setOpacity(1)}
      style={style}
    >
      <View style={styles.checkBox}>
        <Optional condition={isChecked} fallback={<BlueHollowCircle />}>
          <BlueTick />
        </Optional>
      </View>
      <Text.Body color={Colors.menuGrey}>{label}</Text.Body>
    </Pressable>
  )
}

export default CheckBox
