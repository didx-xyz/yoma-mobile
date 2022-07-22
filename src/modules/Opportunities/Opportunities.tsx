//import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView } from 'react-native'

import Card from '~/components/Card'
import FirstTimeCard from '~/components/FirstTimeCard'
import ViewContainer from '~/components/ViewContainer'

import Banner from '../Banner'
import HomeHeader from '../HomeHeader'
//import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import Listing from './Listing'
import styles from './Opportunities.styles'

// interface Props {
//   navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
// }

const Opportunities = ({ navigation }) => {
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <Banner />
      <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
        <FirstTimeCard />
        <Card />
        <Listing navigation={navigation} />
      </ScrollView>
    </ViewContainer>
  )
}
export default Opportunities
