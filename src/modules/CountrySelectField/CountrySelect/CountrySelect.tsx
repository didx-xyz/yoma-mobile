import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { debounce } from 'lodash'
import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import AlphabeticListNavigator, { types as AlphabeticListNavigatorTypes } from '~/components/AlphabeticListNavigator'
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
  const [viewHeight, setViewHeight] = useState(0)
  const { t } = useTranslation()
  const flashListRef = useRef<FlashList<string> | null>(null)
  const { results, setSearchTerm } = useCountriesFilter(countriesByName.ids)

  const handleItemSelect = useCallback(
    (item: string) => {
      onItemSelect(countriesByName.entities[item].code || undefined)
    },
    [countriesByName, onItemSelect],
  )
  const handleNavPress = useCallback((letter: AlphabeticListNavigatorTypes.NavLetter) => {
    if (flashListRef.current) {
      flashListRef.current.scrollToIndex({
        index: letter.index,
      })
    }
  }, [])

  const itemSeparator = useCallback(
    () => (
      <View style={styles.divider}>
        <Divider />
      </View>
    ),
    [],
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
    <View
      style={styles.container}
      onLayout={event => {
        const { height } = event.nativeEvent.layout
        setViewHeight(height)
      }}
    >
      <ListFilter searchPlaceholder={searchPlaceholder} setSearchTerm={debounce(setSearchTerm)} />
      <View style={styles.listContainer}>
        <FlashList
          ref={flashListRef}
          data={results}
          ListEmptyComponent={<Text.Header level={HeaderLevels.H5}>{t('No Results')}</Text.Header>}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderItem}
          estimatedItemSize={54}
        />
        <View style={styles.alphabeticNavContainer}>
          <AlphabeticListNavigator onNav={handleNavPress} data={results} listContainerHeight={viewHeight} />
        </View>
      </View>
    </View>
  )
}
export default CountrySelect
