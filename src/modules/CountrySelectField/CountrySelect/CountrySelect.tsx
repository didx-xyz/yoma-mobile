import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { View } from 'react-native'

import { AlphabetListNavigator } from '~/components/AlphabetListNavigator'
import { NavLetter } from '~/components/AlphabetListNavigator/AlphabetListNavigator.types'
import Divider from '~/components/Divider'
import ListFilter from '~/components/ListFilter'
import Text, { HeaderLevels } from '~/components/Typography'
import { NormalisedCountries } from '~/modules/Countries/Countries.types'

import CountryItem from '../CountryItem'
import { useCountriesFilter } from './CountrySelect.hooks'
import styles from './CountrySelect.styles'

interface Props {
  searchPlaceholder?: string
  countriesByName: NormalisedCountries
  onItemSelect: (code?: string) => void
}
const CountrySelect = ({ searchPlaceholder, countriesByName, onItemSelect }: Props) => {
  const { results, setSearchTerm } = useCountriesFilter(countriesByName.ids)

  const itemSeparator = useCallback(() => <Divider />, [])
  const handleItemSelect = useCallback(
    (item: string) => {
      onItemSelect(countriesByName.entities[item].code || undefined)
    },
    [countriesByName, onItemSelect],
  )
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => (
      <View style={styles.itemContainer}>
        <CountryItem item={item} countries={countriesByName.entities} onPress={() => handleItemSelect(item)} />
      </View>
    ),
    [countriesByName.entities, handleItemSelect],
  )

  const handleNavPress = useCallback((x: NavLetter) => {}, [])

  return (
    <>
      <ListFilter searchPlaceholder={searchPlaceholder} setSearchTerm={debounce(setSearchTerm)} />
      <AlphabetListNavigator onNav={handleNavPress} data={results} />
      <FlashList
        data={results}
        ListEmptyComponent={<Text.Header level={HeaderLevels.H5}>No Results</Text.Header>}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
        estimatedItemSize={54}
      />
    </>
  )
}
export default CountrySelect
