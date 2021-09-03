import { StackNavigationProp } from '@react-navigation/stack'
import { AddIcon, BackIconGrey } from 'assets/images'
import Button, { ButtonVariants } from 'components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { types as HomeNavigationTypes } from '../../modules/HomeNavigation'
import Optional from '../Optional'
import Text, { HeaderLevels } from '../Typography'
import styles from './NormalHeader.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigationTypes.HomeNavigatorParamsList, HomeNavigationTypes.HomeNavigationRoutes>
  headerText: string | React.ReactNode
  onSave?: () => void
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <BackIconGrey />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.h5} color={Colors.PrimaryPurple}>
        {headerText}
      </Text.Header>
      <Optional
        condition={showAddButton}
        fallback={
          <Button
            isDisabled={!isSaveButtonEnabled}
            variant={ButtonVariants.Clear}
            label={t('Save')}
            color={Colors.PrimaryGreen}
            onPress={onSave}
            style={styles.button}
            isFullWidth={false}
          />
        }
      >
        <Button
          variant={ButtonVariants.Clear}
          label={t('Add')}
          color={Colors.PrimaryGreen}
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
