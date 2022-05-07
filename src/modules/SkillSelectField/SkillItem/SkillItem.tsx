import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'

import Text from '~/components/Typography'

import styles from './SkillItem.styles'

interface Props {
  item: string
  onPress: () => void
}
const SkillItem = ({ item, onPress }: Props) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleOnPress = useCallback(() => {
    setIsSelected(true)
    onPress()
  }, [onPress])
  return (
    <Pressable key={item} onPress={handleOnPress} style={styles.container}>
      <Text.Body>{item}</Text.Body>
      {isSelected && <Text.Body>Selected</Text.Body>}
    </Pressable>
  )
}
export default SkillItem
