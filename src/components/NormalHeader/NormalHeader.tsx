import { StackActions } from '@react-navigation/native'
import { BackIconGrey } from 'assets/images'
import React, { useEffect } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { TextStyles } from 'styles'

import styles from './NormalHeader.styles'

type Props = {
  navigation: any
  headerText: string
  onSave?: any
}

const NormalHeader = ({ navigation, headerText, onSave }: Props) => {
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
      <TouchableOpacity onPress={goBack}>
        <BackIconGrey />
      </TouchableOpacity>
      <Text style={[TextStyles.textPrimary, TextStyles.semiBoldText]}>{headerText}</Text>
      <TouchableOpacity onPress={onSave}>
        <Text style={[TextStyles.boldText, TextStyles.textTertiary3, { paddingRight: 20 }]}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NormalHeader
