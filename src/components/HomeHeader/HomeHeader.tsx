import { StackNavigationProp } from '@react-navigation/stack'
import { ZIcon } from 'assets/images'
import { HomeNavigationRoutes } from 'modules/HomeNavigation/HomeNavigation.routes'
import { HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfilePhoto from '../ProfilePhoto'
import Text, { Bold } from '../Typography'
import { PROFILE_IMAGE_BORDER_WIDTH, PROFILE_IMAGE_RADIUS } from './HomeHeader.constants'
import styles from './HomeHeader.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
  profileProgressPercentage: number
  rewardPoints: number
}

const HomeHeader = ({ navigation, profileProgressPercentage = 0, rewardPoints = 0 }: Props) => {
  return (
    <View style={styles.container}>
      <ProfilePhoto
        borderWidth={PROFILE_IMAGE_BORDER_WIDTH}
        onPress={() => navigation.navigate(HomeNavigationRoutes.Profile)}
        outerRadius={PROFILE_IMAGE_RADIUS}
        percent={profileProgressPercentage}
        profileInnerStyle={styles.profileContainer}
      />
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text.Body style={styles.tokenAmount}>
          <Bold color={Colors.primaryYellow}>{rewardPoints}</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
