import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
//import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { CirclePurple } from '~/assets/images'
import ViewContainer from '~/components/ViewContainer'

import HomeHeader from '../HomeHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import List from './List'
import styles from './Marketplace.styles'

interface Props {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
  zltoBalance: number
}

const Marketplace = ({ navigation }: Props) => {
  //const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <View>
        <View style={styles.bgContainer}>
          <CirclePurple style={styles.bgCircle} />
        </View>
      </View>
      <List zltoBalance={0} />
    </ViewContainer>
  )
}

export default Marketplace
