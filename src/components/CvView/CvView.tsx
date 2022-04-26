import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../modules/HomeNavigation/HomeNavigation.types'
import { WithChildren } from '../../types/react.types'
import { ButtonAdd } from '../Button'
import EmptyCard from '../EmptyCard'
import Header from '../Header'
import Optional from '../Optional'
import ViewContainer from '../ViewContainer'
import styles from './CvView.styles'

type Props = WithChildren<{
  title: string
  noDataMessage: string
  onAdd: () => void
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes>
}>

const CvView = ({ title, noDataMessage, onAdd, navigation, children }: Props) => {
  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText={title} actionItem={<ButtonAdd onPress={onAdd} />} />
      <Optional condition={!!children} fallback={<EmptyCard title={noDataMessage} onPress={onAdd} />}>
        <View style={styles.content}>{children}</View>
      </Optional>
    </ViewContainer>
  )
}

export default CvView
