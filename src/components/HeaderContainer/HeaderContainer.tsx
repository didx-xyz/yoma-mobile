import { BackIcon } from 'assets/images'
import React, { useEffect } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { WithChildren } from 'types/react.types'

import { AuthNavigationRoutes } from '../../modules/AuthNavigation/AuthNavigation.types'
import Text, { HeaderLevels } from '../Typography'
import styles from './HeaderContainer.styles'

// TODO: refactor to use correct typing
const onNavigationBack = (navigation: any) => {
  const canGoBack = navigation.canGoBack()
  if (canGoBack) {
    navigation.goBack()
  } else {
    navigation.reset({
      routes: [{ name: AuthNavigationRoutes.Landing }],
    })
  }
}

type Props = WithChildren<{
  headerText: string
  navigation: any
}>

const HeaderContainer = ({ headerText, navigation }: Props) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onNavigationBack(navigation)
      return true
    })
    return () => backHandler.remove()
  }, [navigation])

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backIconView} onPress={onNavigationBack}>
        <BackIcon />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.h5} color={Colors.white}>
        {headerText}
      </Text.Header>
    </View>
  )
}

export default HeaderContainer
