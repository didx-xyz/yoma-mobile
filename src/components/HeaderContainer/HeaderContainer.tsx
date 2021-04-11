import { StackActions } from '@react-navigation/native'
import { BackIcon } from 'assets/Images'
import Text, { HeaderLevels } from 'components/Typography'
import React, { useEffect } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { WithChildren } from 'types/react.types'

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
    navigation.dispatch(StackActions.pop(1))
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
