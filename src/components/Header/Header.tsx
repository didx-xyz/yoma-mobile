import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View } from 'react-native'

import { types as HomeNavigationTypes } from '../../modules/HomeNavigation'
import { Colors } from '../../styles'
import { ButtonAdd, ButtonBack, ButtonSave } from '../Button'
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
}: Props) => (
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
          fallback={<ButtonSave onPress={onSave!} isDisabled={!isSaveButtonEnabled} />}
        >
          <ButtonAdd onPress={onAdd!} />
        </Optional>
      }
    >
      {actionItem}
    </Optional>
  </View>
)

export default Header
