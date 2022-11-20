import { getEmojiFlag } from 'countries-list'
import React from 'react'
import { Pressable, View } from 'react-native'

import { ChevronDownIcon } from '~/assets/images'
import Optional from '~/components/Optional'
import Text, { HeaderLevels } from '~/components/Typography'
import { CountryList } from '~/modules/Countries/Countries.types'
import { Colors, colors } from '~/styles'

import styles from './CountryItem.styles'

interface Props {
  item: string
  placeholder?: string
  countries: CountryList
  onPress: () => void
  showDropdown?: boolean
}
const CountryItem = ({ item, placeholder = '', countries, onPress, showDropdown = false }: Props) => (
  <Pressable onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.content}>
        <Optional
          condition={!!countries[item]?.name}
          fallback={<Text.Body color={Colors.MenuGrey}>{placeholder}</Text.Body>}
        >
          <Text.Header style={styles.flag} level={HeaderLevels.H4}>
            {getEmojiFlag(countries[item]?.code || '')}
          </Text.Header>
          <Text.Body color={Colors.FontBlue}>{countries[item]?.name}</Text.Body>
        </Optional>
      </View>
      <Optional condition={showDropdown}>
        <ChevronDownIcon fill={colors[Colors.MenuGrey]} />
      </Optional>
    </View>
  </Pressable>
)

export default CountryItem
