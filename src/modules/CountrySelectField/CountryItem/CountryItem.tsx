import { getEmojiFlag } from 'countries-list'
import React from 'react'
import { Pressable, View } from 'react-native'

import Text, { HeaderLevels } from '~/components/Typography'
import { CountryList } from '~/modules/Countries/Countries.types'
import { Colors } from '~/styles'

import styles from './CountryItem.styles'

interface Props {
  item: string
  countries: CountryList
  onPress: () => void
}
const CountryItem = ({ item, countries, onPress }: Props) => (
  <Pressable onPress={onPress}>
    <View style={styles.container}>
      <Text.Header style={styles.flag} level={HeaderLevels.H4}>
        {getEmojiFlag(countries[item].code || '')}
      </Text.Header>
      <Text.Body color={Colors.FontBlue}>{countries[item].name}</Text.Body>
    </View>
  </Pressable>
)

export default CountryItem
