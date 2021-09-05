import { slice } from 'ramda'
import React from 'react'
import { View } from 'react-native'

import * as ReduxTypes from '../../../redux/redux.types'
import Button, { ButtonVariants } from '../../Button'
import Divider from '../../Divider'
import styles from './CvWidgetList.styles'

interface Props {
  data: ReduxTypes.NormalisedData
  onViewAll: () => void
  RenderItem: React.ElementType
  maxDisplay?: number
}

const CvWidgetList = ({ data, onViewAll, RenderItem, maxDisplay = 2 }: Props) => {
  const { ids, entities } = data
  const dataIdsToDisplay: string[] = ids ? slice(0, maxDisplay, ids) : []
  return (
    <View style={styles.container}>
      {dataIdsToDisplay.map((item, index) => (
        <View key={item || index}>
          <RenderItem {...entities[item]} />
          <Divider />
        </View>
      ))}
      <Button label="View All" variant={ButtonVariants.Clear} onPress={onViewAll} />
    </View>
  )
}

export default CvWidgetList
