import { Country, getEmojiFlag } from 'countries-list'
import React from 'react'
import { Pressable, View } from 'react-native'

import Text, { HeaderLevels } from '~/components/Typography'

import styles from './CountryItem.styles'

interface Props {
  item: [string, Country]
}
const CountryItem = ({ item }: Props) => (
  <Pressable
    onPress={() => {
      console.log({ name: item[1].name, code: item[0] })
    }}
  >
    <View style={styles.container}>
      <Text.Header level={HeaderLevels.H6}>
        {getEmojiFlag(item[0])} {item[1].name}
      </Text.Header>
    </View>
  </Pressable>
)

export default CountryItem
