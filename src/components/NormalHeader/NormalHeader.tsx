import { StackActions } from '@react-navigation/native'
import { AddIcon, BackIconGrey } from 'assets/images'
import Text, { Bold, HeaderLevels } from 'components/Typography'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

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
  const { t } = useTranslation()
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack}>
        <BackIconGrey />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.h5}>{headerText}</Text.Header>
      {add ? (
        <TouchableOpacity onPress={onAdd} style={styles.addView}>
          <Text.Body>
            <Bold color={Colors.primaryGreen}>{t('Add')}</Bold>
          </Text.Body>
          <AddIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onSave} style={styles.addView}>
          <Text.Body>
            <Bold color={Colors.primaryGreen}>{t('Save')}</Bold>
          </Text.Body>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default NormalHeader
