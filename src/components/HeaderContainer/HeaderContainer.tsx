import { BackIcon } from 'assets/images'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React, { useEffect } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { WithChildren } from 'types/react.types'

import Text, { HeaderLevels } from '../Typography'
import styles from './HeaderContainer.styles'

type Props = WithChildren<{
  headerText: string
  navigation: any
}>

const HeaderContainer = ({ headerText, navigation }: Props) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      goBack()
      return true
    })
    return () => backHandler.remove()
  }, [])

  const goBack = () => {
    const canGoBack = navigation.canGoBack()
    if (canGoBack) {
      navigation.goBack()
    } else {
      navigation.reset({
        routes: [{ name: NavigationRoutes.Landing }],
      })
    }
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backIconView} onPress={goBack}>
        <BackIcon />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.h5} color={Colors.white}>
        {headerText}
      </Text.Header>
    </View>
  )
}

export default HeaderContainer
