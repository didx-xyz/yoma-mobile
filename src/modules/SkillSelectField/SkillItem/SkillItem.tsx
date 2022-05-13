import React, { useCallback, useState } from 'react'
import { Pressable } from 'react-native'

import { HStack } from '~/components/Stack'
import Text from '~/components/Typography'
import ItemSelected from '~/modules/SkillSelectField/SkillItem/ItemSelected'

import styles from './SkillItem.styles'

interface Props {
  item: string
  onPress: () => void
}
const SkillItem = ({ item, onPress }: Props) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleOnPress = useCallback(() => {
    setIsSelected(prevIsSelected => !prevIsSelected)
    onPress()
  }, [onPress])

  return (
    <Pressable key={item} onPress={handleOnPress} style={styles.container}>
      <HStack>
        <ItemSelected isSelected={isSelected} />
        <Text.Body>{item}</Text.Body>
      </HStack>
    </Pressable>
  )
}
export default SkillItem
