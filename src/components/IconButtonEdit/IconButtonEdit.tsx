import React from 'react'
import { Pressable, View } from 'react-native'

import { EditIcon } from '../../assets/images'
import styles from './IconButtonEdit.styles'

interface EditButtonProps {
  onPress: () => void
}
const IconButtonEdit = ({ onPress }: EditButtonProps) => (
  <Pressable onPress={onPress} hitSlop={20} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
    <View style={styles.container}>
      <EditIcon />
    </View>
  </Pressable>
)

export default IconButtonEdit
