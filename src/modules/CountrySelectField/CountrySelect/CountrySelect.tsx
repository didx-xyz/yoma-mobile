import { debounce } from 'lodash'
import React, { useCallback } from 'react'
import { ListRenderItemInfo, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

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

  return (
    <>
      <ListFilter searchPlaceholder={searchPlaceholder} setSearchTerm={debounce(setSearchTerm)} />
      <FlatList
        data={results}
        ListEmptyComponent={<Text.Header level={HeaderLevels.H5}>No Results</Text.Header>}
        ItemSeparatorComponent={itemSeparator}
        renderItem={renderItem}
      />
    </>
  )
}
export default CountrySelect
