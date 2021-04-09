import { StackActions } from '@react-navigation/native'
import { AddIcon, BackIconGrey } from 'assets/Images'
import React, { useEffect } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { TextStyles } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './NormalHeader.styles'

type Props = {
  navigation: any
  headerText: string
  onSave?: any
  add?: boolean
  onAdd?: any
}

const NormalHeader = ({ navigation, headerText, onSave, add, onAdd }: Props) => {
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
      {add ? (
        <TouchableOpacity onPress={onAdd} style={{ flexDirection: 'row', paddingRight: 20 }}>
          <Text style={[TextStyles.boldText, TextStyles.textTertiary3]}>Add</Text>
          <AddIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSave}>
          <Text style={[TextStyles.boldText, TextStyles.textTertiary3, { paddingRight: 20 }]}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default NormalHeader
