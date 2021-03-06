import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'

import { ButtonBack } from '~/components/Button'
import Text, { HeaderLevels } from '~/components/Typography'
import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import { Colors } from '~/styles'

import styles from './Header.styles'

type Props = {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes
  >
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
