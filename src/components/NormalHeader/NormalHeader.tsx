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

type Props = {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
  headerText: string | React.ReactNode
  onSave: () => void
  showAddButton?: boolean
  onAdd?: () => void
  isSaveButtonEnabled?: boolean
}

const NormalHeader = ({
  navigation,
  headerText,
  onSave,
  showAddButton = false,
  isSaveButtonEnabled = false,
  onAdd,
}: Props) => {
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
          <Button
            isDisabled={!isSaveButtonEnabled}
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
