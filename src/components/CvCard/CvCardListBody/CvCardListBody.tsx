import { slice } from 'ramda'
import React from 'react'
import { View } from 'react-native'

import { NormalisedData } from '../../../redux/redux.types'
import Button, { ButtonVariants } from '../../Button'
import Divider from '../../Divider'
import { Optional } from '../../index'
import styles from './CvCardListBody.styles'

interface Props {
  data: NormalisedData
  onViewAll: () => void
  Item: any
  maxDisplay?: number
}

const CvCardListBody = ({ data, onViewAll, Item, maxDisplay = 2 }: Props) => {
  const { ids, entities } = data
  const dataIdsToDisplay: string[] = ids ? slice(0, maxDisplay, ids) : []
  return (
    <View style={styles.container}>
      {dataIdsToDisplay.map((item, index) => (
        <View key={item || index}>
          <Item {...entities[item]} />
          <Divider />
        </View>
      ))}
      <Optional condition={ids.length > dataIdsToDisplay.length}>
        <Button label="View All" variant={ButtonVariants.Clear} onPress={onViewAll} />
      </Optional>
    </View>
  )
}

export default CvCardListBody
