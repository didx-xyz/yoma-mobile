import { StackNavigationProp } from '@react-navigation/stack'
import { ZIcon } from 'assets/images'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfilePhoto from '../ProfilePhoto'
import Text, { Bold } from '../Typography'
import { PROFILE_IMAGE_BORDER_WIDTH, PROFILE_IMAGE_RADIUS } from './HomeHeader.constants'
import styles from './HomeHeader.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes>
  percentCompleted: number
  tokens: number
}

const HomeHeader = ({ navigation, percentCompleted = 0, tokens = 0 }: Props) => {
  return (
    <View style={styles.container}>
      <ProfilePhoto
        borderWidth={PROFILE_IMAGE_BORDER_WIDTH}
        onPress={() => navigation.navigate(NavigationRoutes.Profile)}
        outerRadius={PROFILE_IMAGE_RADIUS}
        percent={percentCompleted}
        profileInnerStyle={styles.profileContainer}
      />
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text.Body style={styles.tokenAmount}>
          <Bold color={Colors.primaryYellow}>{tokens}</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
