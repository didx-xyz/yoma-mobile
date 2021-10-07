import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'

import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import { Colors } from '~/styles'

import { ButtonBack } from '../Button'
import Text, { HeaderLevels } from '../Typography'
import styles from './Header.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigationTypes.HomeNavigatorParamsList, HomeNavigationTypes.HomeNavigationRoutes>
  headerText: string | React.ReactNode
  actionItem?: React.ReactNode
}

const Header = ({ navigation, headerText, actionItem }: Props) => (
  <View style={styles.container}>
    <ButtonBack onPress={navigation.goBack} />
    <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple}>
      {headerText}
    </Text.Header>
    {actionItem}
  </View>
)

export default Header
