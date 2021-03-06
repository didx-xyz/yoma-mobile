import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { FCWithChildren } from '~/types/react.types'

import EmptyCard from '../EmptyCard'
import Header from '../Header'
import Optional from '../Optional'
import ViewContainer from '../ViewContainer'
import ActionButton from './ActionButton'
import styles from './CvView.styles'

interface Props extends FCWithChildren {
  title: string
  noDataMessage: string
  onAction: () => void
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
  isEditAction?: boolean
}

const CvView = ({ title, noDataMessage, onAction, navigation, children, isEditAction = false }: Props) => {
  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={title}
        actionItem={<ActionButton onAction={onAction} isEditAction={isEditAction} />}
      />
      <Optional condition={!!children} fallback={<EmptyCard title={noDataMessage} onPress={onAction} />}>
        <View style={styles.content}>{children}</View>
      </Optional>
    </ViewContainer>
  )
}

export default CvView
