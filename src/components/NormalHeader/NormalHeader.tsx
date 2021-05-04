import { StackActions } from '@react-navigation/native'
import { AddIcon, BackIconGrey } from 'assets/images'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { Bold, HeaderLevels } from '../Typography'
import styles from './NormalHeader.styles'

type Props = {
  navigation: any
  headerText: string | React.ReactNode
  onSave?: () => void
  showAddButton?: boolean
  onAdd?: () => void
}

const NormalHeader = ({ navigation, headerText, onSave, showAddButton = false, onAdd }: Props) => {
  const { t } = useTranslation()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onNavigateBack()
      return true
    })
    return () => backHandler.remove()
  }, [])

  const onNavigateBack = () => {
    navigation.dispatch(StackActions.pop(1))
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onNavigateBack}>
        <BackIconGrey />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple}>
        {headerText}
      </Text.Header>
      <Optional
        condition={showAddButton}
        fallback={
          <TouchableOpacity onPress={onSave} style={styles.addButton}>
            <Text.Body>
              <Bold color={Colors.primaryGreen}>{t('Save')}</Bold>
            </Text.Body>
          </TouchableOpacity>
        }
      >
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <Text.Body>
            <Bold color={Colors.primaryGreen}>{t('Add')}</Bold>
          </Text.Body>
          <View style={styles.addIcon}>
            <AddIcon />
          </View>
        </TouchableOpacity>
      </Optional>
    </View>
  )
}

export default NormalHeader
