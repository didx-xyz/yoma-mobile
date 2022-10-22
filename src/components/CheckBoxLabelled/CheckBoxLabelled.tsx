import React from 'react'
import { Pressable } from 'react-native'

import Checkbox from '~/components/Checkbox'
import Text from '~/components/Typography'
import { Colors } from '~/styles'

import { DEFAULT_OPACITY_VALUE, LOW_OPACITY_VALUE } from './CheckBoxLabelled.constants'
import styles from './CheckBoxLabelled.styles'

type Props = {
  label: string | React.ReactNode
  isSelected: boolean
  onPress: () => void
}

const CheckBoxLabelled = ({ label, isSelected, onPress }: Props) => {
  return (
    <Pressable
      hitSlop={10}
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? LOW_OPACITY_VALUE : DEFAULT_OPACITY_VALUE,
        },
        styles.container,
      ]}
    >
      <Checkbox isSelected={isSelected} />
      <Text.Body color={Colors.MenuGrey}>{label}</Text.Body>
    </Pressable>
  )
}

export default CheckBoxLabelled
