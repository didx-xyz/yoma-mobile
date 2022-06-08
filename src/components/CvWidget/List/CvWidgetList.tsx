import { slice } from 'ramda'
import React, { useCallback } from 'react'
import { View } from 'react-native'

import Button, { ButtonVariants } from '~/components/Button'
import Divider from '~/components/Divider'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import * as ReduxTypes from '~/redux/redux.types'

import styles from './CvWidgetList.styles'

interface Props {
  data: ReduxTypes.NormalisedData
  viewRoute: HomeNavigationRoutes
  RenderItem: React.ElementType
  maxDisplay?: number
  navigation: MyCvTypes.MyCvNavigation
}

const CvWidgetList = ({ data, navigation, viewRoute, RenderItem, maxDisplay = 2 }: Props) => {
  const { ids, entities } = data
  const dataIdsToDisplay: string[] = ids ? slice(0, maxDisplay, ids) : []
  const cvWidgetNavigation = useCallback(() => navigation.navigate(viewRoute), [navigation, viewRoute])

  return (
    <View style={styles.container}>
      {dataIdsToDisplay.map((item, index) => (
        <View key={item || index}>
          <RenderItem onPress={cvWidgetNavigation} {...entities[item]} />
          <Divider />
        </View>
      ))}
      <Button label="View All" variant={ButtonVariants.Clear} onPress={cvWidgetNavigation} />
    </View>
  )
}

export default CvWidgetList
