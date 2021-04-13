import { StackActions } from '@react-navigation/native'
import { BackIconGrey } from 'assets/images'
import Text, { Bold, HeaderLevels } from 'components/Typography'
import React, { useEffect } from 'react'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

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
      <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple}>
        {headerText}
      </Text.Header>
      <TouchableOpacity onPress={onSave}>
        <Text.Body color={Colors.primaryGreen} style={styles.saveText}>
          <Bold>Save</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default NormalHeader
