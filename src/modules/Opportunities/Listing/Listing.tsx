//import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { ZIcon } from '~/assets/images'
import DateDisplay from '~/components/DateDisplay'
import Searchbar from '~/components/SearchBar'
import { Bold } from '~/components/Typography'
//import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { OpportunitiesSelector } from '~/modules/Opportunities/Opportunities.selector'
//import { NormalisedDataEntities } from '~/redux/redux.types'
import { Colors } from '~/styles'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { fetchOpportunities } from '../Opportunities.reducer'
//import { opportunities } from '../Opportunities.types'
import styles from './Listing.styles'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
}

const Listing = ({ navigation }: Props) => {
  const DATA = useSelector(OpportunitiesSelector)
  //const test: opportunities = DATA.entities as opportunities

  const [data, setData] = useState(DATA)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOpportunities())
  }, [dispatch])

  useEffect(() => {
    setData(data)
  }, [data])

  const _renderItem = ({ item }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, itemData] = item

    return (
      <TouchableOpacity style={[styles.item]}>
        <View style={styles.OrganizationInfoContainer}>
          <View style={styles.nameContainer}>
            <Text style={[styles.name]}>{itemData?.organisationName}</Text>
          </View>
          <View style={styles.imageViewContainer}>
            <Image style={styles.profileImage} source={{ uri: itemData?.organisationLogoURL }} />
          </View>
        </View>
        <View style={styles.titleViewContainer}>
          <TouchableOpacity onPress={() => navigation.navigate(HomeNavigationRoutes.Detailed, itemData)}>
            <Text style={styles.title}>{itemData?.title}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.biographyContainer}>
          <Text style={styles.biography}>{itemData?.description}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomLeftView}>
            <Text style={styles.bottomText}>
              {' '}
              {itemData.timePeriod} • {itemData.difficulty} •
            </Text>
            <Text style={styles.bottomText}>
              • Starts{itemData?.startTime && <DateDisplay date={itemData.startTime} template={'dd MMM yyyy'} />}• 30
              participants
            </Text>
          </View>
          <TouchableOpacity style={styles.tokensView}>
            <ZIcon />
            <Text style={styles.tokenAmount}>
              <Bold color={Colors.PrimaryYellow}>{itemData?.zltoReward}</Bold>
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  const _keyExtractor = item => {
    const [key] = item
    return key
  }

  function updateSearch(text) {
    if (text !== '') {
      const newData = data.filter(function (item) {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setData(newData)
    } else {
      setData(data)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar value={data} updateSearch={updateSearch} />
      <FlatList data={Object.entries(DATA)} keyExtractor={_keyExtractor} renderItem={_renderItem} />
    </SafeAreaView>
  )
}

export default Listing
