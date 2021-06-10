import { StackActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AddIcon, BackIconGrey } from 'assets/images'
import Button, { ButtonVariants } from 'components/Button'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import Optional from '../Optional'
import Text, { HeaderLevels } from '../Typography'
import styles from './NormalHeader.styles'

const onNavigateBack = (navigation: any) => {
  navigation.dispatch(StackActions.pop(1))
}

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
  headerText: string | React.ReactNode
  onSave?: () => void
  showAddButton?: boolean
  onAdd?: () => void
}

const NormalHeader = ({ navigation, headerText, onSave, showAddButton = false, onAdd }: Props) => {
  const { t } = useTranslation()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onNavigateBack(navigation)
      return true
    })
    return () => backHandler.remove()
  }, [navigation])

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
          <Button
            variant={ButtonVariants.Clear}
            label={t('Save')}
            color={Colors.primaryGreen}
            onPress={onSave}
            style={styles.button}
            isFullWidth={false}
          />
        }
      >
        <Button
          variant={ButtonVariants.Clear}
          label={t('Add')}
          color={Colors.primaryGreen}
          onPress={onAdd!}
          style={styles.addButton}
          isFullWidth={false}
        >
          <View style={styles.addIcon}>
            <AddIcon />
          </View>
        </Button>
      </Optional>
    </View>
  )
}

export default NormalHeader
