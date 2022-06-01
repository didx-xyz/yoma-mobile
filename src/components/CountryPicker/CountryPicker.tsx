import { countries, getEmojiFlag } from 'countries-list'
import { toPairs } from 'ramda'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

import Text, { HeaderLevels } from '~/components/Typography'

const CountryPicker = () => {
  return (
    <FlatList
      data={toPairs(countries)}
      renderItem={({ item }) => (
        <Text.Header level={HeaderLevels.H6}>
          {getEmojiFlag(item[0])} {item[1].name}
        </Text.Header>
      )}
    />
  )
}
export default CountryPicker
