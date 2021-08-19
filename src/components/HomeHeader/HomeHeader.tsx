import { StackNavigationProp } from '@react-navigation/stack'
import { ZIcon } from 'assets/images'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfilePhoto from '../ProfilePhoto'
import Text, { Bold } from '../Typography'
import { PROFILE_IMAGE_BORDER_WIDTH, PROFILE_IMAGE_RADIUS } from './HomeHeader.constants'
import styles from './HomeHeader.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
  profileImageUrl: string | null
  profileProgressPercentage?: number
  zltoBalance?: number
}

const HomeHeader = ({ navigation, profileImageUrl, profileProgressPercentage = 0, zltoBalance = 0 }: Props) => {
  return (
    <View style={styles.container}>
      <ProfilePhoto
        uri={profileImageUrl}
        borderWidth={PROFILE_IMAGE_BORDER_WIDTH}
        onPress={() => navigation.navigate(HomeNavigationRoutes.Profile)}
        outerRadius={PROFILE_IMAGE_RADIUS}
        percent={profileProgressPercentage}
        profileInnerStyle={styles.profileContainer}
      />
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text.Body style={styles.tokenAmount}>
          <Bold color={Colors.primaryYellow}>{zltoBalance}</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
