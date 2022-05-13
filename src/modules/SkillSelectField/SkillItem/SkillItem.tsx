import React, { memo, useCallback, useState } from 'react'
import { Pressable } from 'react-native'

import Radio from '~/components/Radio'
import { HStack } from '~/components/Stack'
import Text from '~/components/Typography'

import styles from './SkillItem.styles'

interface Props {
  item: string
  onPress: (item: string) => void
}
const SkillItem = memo(({ item, onPress }: Props) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleOnPress = useCallback(() => {
    setIsSelected(prevIsSelected => !prevIsSelected)
    onPress(item)
  }, [item, onPress])

  return (
    <Pressable onPress={handleOnPress} style={styles.container}>
      <HStack>
        <Radio isSelected={isSelected} />
        <Text.Body>{item}</Text.Body>
      </HStack>
    </Pressable>
  )
})
export default SkillItem
