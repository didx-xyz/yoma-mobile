import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

import ViewContainer from '~/components/ViewContainer'

import CustomBanner from '../../components/CustomBanner'
import Courses from '../Courses'
import HomeHeader from '../HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import styles from './Opportunities.styles'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
}

const Opportunities = ({ navigation }: Props) => {
  const [isBannerShow, setBannerShow] = useState(true)
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <CustomBanner isBannerShow={isBannerShow} setBannerShow={setBannerShow} />
      <ScrollView contentContainerStyle={styles.scrollInnerContainer} onScroll={() => setBannerShow(false)}>
        <Courses navigation={navigation} />
      </ScrollView>
    </ViewContainer>
  )
}
export default Opportunities
