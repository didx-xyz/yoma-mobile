import React from 'react'
import { Pressable, View } from 'react-native'

import { FCWithChildren } from '~/types/react.types'

import styles from './IconButton.styles'

interface Props extends FCWithChildren {
  onPress: () => void
}

const IconButton = ({ onPress, children }: Props) => (
  <Pressable onPress={onPress} hitSlop={20} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
    <View style={styles.container}>{children}</View>
  </Pressable>
)

export default IconButton
