import { StackNavigationProp } from '@react-navigation/stack'
import { BackIconGrey } from 'assets/images'
import Button, { ButtonVariants } from 'components/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { types as HomeNavigationTypes } from '../../modules/HomeNavigation'
import ButtonAdd from '../ButtonAdd'
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
  actionRight?: React.ReactNode
}

const Header = ({
  navigation,
  headerText,
  onSave,
  showAddButton = false,
  isSaveButtonEnabled = false,
  onAdd,
  actionRight,
}: Props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
        <BackIconGrey />
      </TouchableOpacity>
      <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple}>
        {headerText}
      </Text.Header>
      <Optional
        // TODO: refactoring to only expect the actionRight
        condition={!!actionRight}
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
        {actionRight}
      </Optional>
    </View>
  )
}

export default Header
