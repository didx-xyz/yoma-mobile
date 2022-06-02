import { Country, countries } from 'countries-list'
import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import CountryItem from '~/components/CountryPicker/CountryItem'
import { sortCountriesAsPairs } from '~/components/CountryPicker/CountryPicker.utils'
import Divider from '~/components/Divider'
import Text, { HeaderLevels } from '~/components/Typography'

const CountryPicker = () => {
  const sortedCountries = sortCountriesAsPairs(countries)
  return (
    <FlatList
      data={sortedCountries}
      ListHeaderComponent={() => <Text.Header level={HeaderLevels.H5}>Pick a country</Text.Header>}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({ item }: ListRenderItemInfo<[string, Country]>) => <CountryItem item={item} />}
    />
  )
}
export default CountryPicker
