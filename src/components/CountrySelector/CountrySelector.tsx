import { countries } from 'countries-list'
import React, { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Divider from '~/components/Divider'
import ListFilter from '~/components/ListFilter/ListFilter'
import Text, { HeaderLevels } from '~/components/Typography'

import CountryItem from './CountryItem'
import { useCountriesFilter } from './CountrySelector.hooks'
import { CountryListItem } from './CountrySelector.types'
import { sortCountriesAsPairs } from './CountrySelector.utils'

interface Props {
  searchPlaceholder: string
}

const CountrySelector = ({ searchPlaceholder }: Props) => {
  const sortedCountries = useMemo(() => sortCountriesAsPairs(countries), [])
  const { results, setSearchTerm } = useCountriesFilter(sortedCountries)

  return (
    <>
      <ListFilter searchPlaceholder={searchPlaceholder} setSearchTerm={setSearchTerm} />
      <FlatList
        data={results}
        ListEmptyComponent={<Text.Header level={HeaderLevels.H5}>No Results</Text.Header>}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }: ListRenderItemInfo<CountryListItem>) => <CountryItem item={item} />}
      />
    </>
  )
}
export default CountrySelector
