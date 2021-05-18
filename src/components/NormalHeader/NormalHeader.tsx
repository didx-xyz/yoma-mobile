import { StackActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AddIcon, BackIconGrey } from 'assets/images'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { Bold, HeaderLevels } from '../Typography'
import styles from './NormalHeader.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes>
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
    <View style={styles.container}>
      <TouchableOpacity onPress={onNavigateBack}>
        <BackIconGrey />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple}>
        {headerText}
      </Text.Header>
      <Optional
        condition={showAddButton}
        fallback={
          <TouchableOpacity onPress={onSave} style={styles.button}>
            <Text.Body>
              <Bold color={Colors.primaryGreen}>{t('Save')}</Bold>
            </Text.Body>
          </TouchableOpacity>
        }
      >
        <TouchableOpacity onPress={onAdd} style={styles.button}>
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
