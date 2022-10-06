import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { t } from 'i18next'
import { mergeRight } from 'ramda'
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { SearchIcon } from '~/assets/images'
import SearchBar from '~/components/SearchBar'
import Text, { HeaderLevels } from '~/components/Typography'
import { Colors, colors } from '~/styles'

import { apiConfig } from '../../api'
import { constants as ApiOpportunitiesConstants } from '../../api/opportunities'
import CourseWidget from '../Courses/widget'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import styles from './Search.style'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
}

const Search = ({ navigation }: Props) => {
  const [results, setResults] = useState(null)
  const [courses, setCourses] = useState<{}[] | null>(null)
  const [input, setInput] = useState('')
  let userInput: string[] = []
  const updateSearch = async (text: string) => {
    setInput(text)
    let prevResults = await getData()
    if (text !== '') {
      const newData = prevResults?.filter((item: string) => {
        const itemData = item ? item.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setResults(newData)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('key')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.log('error reading')
    }
  }

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(userInput)
      await AsyncStorage.setItem('key', jsonValue)
    } catch (e) {
      console.log('Saving error')
    }
  }

  const onSearch = async (text: React.SetStateAction<string>) => {
    await setInput(text)

    let prevResults = await getData()
    if (prevResults) {
      userInput = [...prevResults]
    }
    if (!userInput.includes(input)) {
      userInput.push(input)
    }
    storeData()

    apiConfig
      .createApiClient(
        mergeRight(ApiOpportunitiesConstants.SEARCH_OPPORTUNITIES_CONFIG, { params: { searchstring: text } }),
      )
      .then(res => {
        setResults(null)
        setCourses(res.data.data)
      })
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const _renderResults = ({ item }: any) => (
    <TouchableOpacity style={styles.resultContainer} onPress={() => onSearch(item)}>
      <SearchIcon />
      <View style={styles.rendertextContainer}>
        <Text.Body style={styles.renderText}>{item}</Text.Body>
        <View style={styles.verticalLine} />
      </View>
    </TouchableOpacity>
  )

  // eslint-disable-next-line react/no-unstable-nested-components
  const _renderCoures = ({ item }: any) => {
    return <CourseWidget navigation={navigation} item={item} />
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchBar
            value={input}
            updateSearch={updateSearch}
            onSearch={onSearch}
            backgroundColor={colors[Colors.BackgroundGrey]}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text.Body style={styles.text}>{t('Cancel')}</Text.Body>
        </TouchableOpacity>
      </View>
      {!results && !courses && <Text.Body style={styles.typeToSearch}>Type to start your search</Text.Body>}
      {results ? (
        <View style={styles.searchResultContainer}>
          <Text.Header level={HeaderLevels.H3}>Results</Text.Header>
          <FlatList data={results} renderItem={_renderResults} />
        </View>
      ) : (
        <View style={styles.searchResultContainer}>
          {courses && <Text.Header level={HeaderLevels.H3}>{`${courses?.length} results`}</Text.Header>}
          <FlatList data={courses} renderItem={_renderCoures} />
        </View>
      )}
    </>
  )
}

export default Search
