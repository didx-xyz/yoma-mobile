import React, { useMemo } from 'react'
import { ListRenderItemInfo } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import Divider from '~/components/Divider'
import ListFilter from '~/components/ListFilter/ListFilter'
import Text, { HeaderLevels } from '~/components/Typography'
import { NormalisedCountries } from '~/modules/Countries/Countries.types'

import CountryItem from '../CountryItem/CountryItem'
import { useCountriesFilter } from './CountrySelect.hooks'
import { CountryListItem } from './CountrySelect.types'
import { sortCountriesAsPairs } from './CountrySelect.utils'

interface Props {
  searchPlaceholder: string
  countries: NormalisedCountries
}

const CountrySelect = ({ searchPlaceholder, countries }: Props) => {
  const sortedCountries = useMemo(() => sortCountriesAsPairs(countries), [countries])
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
export default CountrySelect
