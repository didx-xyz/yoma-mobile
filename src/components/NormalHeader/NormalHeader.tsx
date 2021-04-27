import { StackActions } from '@react-navigation/native'
import { AddIcon, BackIconGrey } from 'assets/images'
import { Optional } from 'components'
import Text, { Bold, HeaderLevels } from 'components/Typography'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import styles from './NormalHeader.styles'

type Props = {
  navigation: any
  headerText: string
  onSave?: () => void
  isAdd?: boolean
  onAdd?: any
}

const NormalHeader = ({ navigation, headerText, onSave, isAdd = false, onAdd }: Props) => {
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
      <Optional
        condition={isAdd}
        fallback={
          <TouchableOpacity onPress={onSave} style={styles.addView}>
            <Text.Body>
              <Bold color={Colors.primaryGreen}>{t('Save')}</Bold>
            </Text.Body>
          </TouchableOpacity>
        }
      >
        <TouchableOpacity onPress={onAdd} style={styles.addView}>
          <Text.Body>
            <Bold color={Colors.primaryGreen}>{t('Add')}</Bold>
          </Text.Body>
          <AddIcon />
        </TouchableOpacity>
      </Optional>
    </View>
  )
}

export default NormalHeader
