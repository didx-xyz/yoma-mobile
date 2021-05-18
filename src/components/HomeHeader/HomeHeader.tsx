import { StackNavigationProp } from '@react-navigation/stack'
import { ZIcon } from 'assets/images'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfilePhoto from '../ProfilePhoto'
import Text, { Bold } from '../Typography'
import styles from './HomeHeader.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
}

const HomeHeader = ({ navigation }: Props) => {
  return (
    <View style={styles.header}>
      <ProfilePhoto
        borderWidth={3}
        onPress={() => navigation.navigate(HomeNavigationRoutes.Profile)}
        outerRadius={17}
        percent={10}
        profileInnerStyle={styles.profileInnerView}
      />
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text.Body style={styles.tokenAmount}>
          <Bold color={Colors.primaryYellow}>1000</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
