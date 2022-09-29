/* eslint-disable react-hooks/exhaustive-deps */
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { mergeRight } from 'ramda'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { apiConfig } from '~/api'
import { constants as ApiOpportunitiesConstants } from '~/api/opportunities'
import { FilterIcon, GreenFilter } from '~/assets/images'
import FilterModal from '~/components/FilterModal/FilterModal'
import Optional from '~/components/Optional'
import Searchbar from '~/components/SearchBar'
import Text, { HeaderLevels } from '~/components/Typography'
import { OpportunitiesSelector } from '~/modules/Opportunities/Opportunities.selector'
import { Colors, colors } from '~/styles'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { fetchOpportunities } from '../Opportunities/Opportunities.reducer'
import { opportunities } from '../Opportunities/Opportunities.types'
import styles from './Courses.style'
import { FilterData } from './Courses.types'
import CourseWidget from './widget'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
}

const Courses = ({ navigation }: Props) => {
  const DATA = useSelector(OpportunitiesSelector)

  const [data, setData] = useState<opportunities[]>([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [isFiltered, setFiltered] = useState(false)
  const [filterData, setFilterData] = useState<FilterData>({
    skills: '',
    type: '',
    language: '',
    countries: '',
    dateposted: '',
    organisationid: '',
  })
  const dispatch = useDispatch()
  const { entities, ids } = DATA

  const OppData = ids?.map((item: string | number) => entities[item])

  useEffect(() => {
    dispatch(fetchOpportunities())
  }, [dispatch])

  useEffect(() => {
    setData(OppData)
  }, [DATA])
  useEffect(() => {
    console.log(filterData, 'FilterData')
    if (isFiltered) {
      apiConfig
        .createApiClient(
          mergeRight(ApiOpportunitiesConstants.FILTERSEARCH_OPPORTUNITIES_CONFIG, {
            data: {
              ...filterData,
            },
          }),
        )
        .then(res => {
          setData(res.data.data)
        })
    } else {
      setData(OppData)
    }
  }, [isFiltered])
  useEffect(() => {
    for (let key in filterData) {
      if (filterData[key]) {
        setFiltered(true)
        return
      }
      setFiltered(false)
    }
  }, [filterData])

  const renderCourses = ({ item }: any) => {
    return <CourseWidget navigation={navigation} item={item} />
  }

  const _keyExtractor = (item: { id: any }) => {
    return item.id
  }

  function updateSearch() {
    navigation.navigate(HomeNavigationRoutes.Search)
  }

  const addFilter = () => {
    setModalOpen(true)
  }
  console.log(data, 'DATA:::')
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchContainer}>
            <Searchbar
              onSearch={() => navigation.navigate(HomeNavigationRoutes.Search)}
              value={data}
              onFocus={updateSearch}
              backgroundColor={colors[Colors.White]}
            />
          </View>
          <TouchableOpacity onPress={addFilter}>
            <Optional condition={isFiltered} fallback={<FilterIcon />}>
              <GreenFilter />
            </Optional>
          </TouchableOpacity>
        </View>
        {data?.length > 0 ? (
          <FlatList data={data} keyExtractor={_keyExtractor} renderItem={renderCourses} />
        ) : (
          <Text.Header level={HeaderLevels.H5} style={styles.noOpportunity}>
            No Opportunities available
          </Text.Header>
        )}
      </SafeAreaView>
      <FilterModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        title="Filter"
        filterData={filterData}
        setFilterData={setFilterData}
      />
    </>
  )
}

export default Courses
