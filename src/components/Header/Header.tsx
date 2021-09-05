import { StackNavigationProp } from '@react-navigation/stack'
import Button, { ButtonVariants } from 'components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import { types as HomeNavigationTypes } from '../../modules/HomeNavigation'
import ButtonAdd from '../ButtonAdd'
import ButtonBack from '../ButtonBack'
import Optional from '../Optional'
import Text, { HeaderLevels } from '../Typography'
import styles from './Header.styles'

type Props = {
  navigation: StackNavigationProp<HomeNavigationTypes.HomeNavigatorParamsList, HomeNavigationTypes.HomeNavigationRoutes>
  headerText: string | React.ReactNode
  onSave?: () => void
  showAddButton?: boolean
  onAdd?: () => void
  isSaveButtonEnabled?: boolean
  actionItem?: React.ReactNode
}

const Header = ({
  navigation,
  headerText,
  onSave,
  showAddButton = false,
  isSaveButtonEnabled = false,
  onAdd,
  actionItem,
}: Props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <ButtonBack onPress={navigation.goBack} />
      <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple}>
        {headerText}
      </Text.Header>
      <Optional
        // TODO: refactoring to only expect the actionItem
        condition={!!actionItem}
        fallback={
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
            <ButtonAdd onPress={onAdd!} />
          </Optional>
        }
      >
        {actionItem}
      </Optional>
    </View>
  )
}

export default Header
