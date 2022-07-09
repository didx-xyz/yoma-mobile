import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { ZIcon } from '~/assets/images'
import ProfilePhoto from '~/components/ProfilePhoto'
import Text, { Bold } from '~/components/Typography'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { Colors } from '~/styles'

import { PROFILE_IMAGE_BORDER_WIDTH, PROFILE_IMAGE_RADIUS, PROFILE_IMAGE_SIZE } from './HomeHeader.constants'
import styles from './HomeHeader.styles'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
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
        size={PROFILE_IMAGE_SIZE}
        percent={profileProgressPercentage}
        profileInnerStyle={styles.profileContainer}
      />
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text.Body style={styles.tokenAmount}>
          <Bold color={Colors.PrimaryYellow}>{zltoBalance}</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
