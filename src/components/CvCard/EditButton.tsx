import React from 'react'
import { Pressable } from 'react-native'

import { EditIcon } from '../../assets/images'
import { Colors, colors } from '../../styles'

interface EditButtonProps {
  onPress: () => void
}
const EditButton = ({ onPress }: EditButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [{ backgroundColor: colors[Colors.backgroundGrey], opacity: pressed ? 0.5 : 1 }]}
  >
    <EditIcon />
  </Pressable>
)

export default EditButton
