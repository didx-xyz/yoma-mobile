import React from 'react'
import { useCallback } from 'react'
import { View } from 'react-native'

import { Link } from '~/components/Typography'

type IndexMap = [string, number]

interface Props {
  indexMap: IndexMap[]
  onPress: (index: number) => void
}
const AlphabetNav = ({ indexMap, onPress }: Props) => {
  const handlePress = useCallback(
    (index: IndexMap) => {
      onPress(index[1])
    },
    [onPress],
  )
  return (
    <View>
      {indexMap.map(index => (
        <Link onPress={() => handlePress(index)}>{index[0]}</Link>
      ))}
    </View>
  )
}
export default AlphabetNav
