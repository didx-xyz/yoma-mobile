import { slice } from 'ramda'
import React from 'react'
import { View } from 'react-native'

import Button, { ButtonVariants } from '../Button'
import Divider from '../Divider'
import { Optional } from '../index'
import styles from './CvCardListBody.styles'

interface Props {
  data: any[]
  onViewAll: () => void
  Item: any
  maxDisplay?: number
}
const CvCardListBody = ({ data, onViewAll, Item, maxDisplay = 2 }: Props) => {
  const dataToDisplay: typeof data = slice(0, maxDisplay, data)
  return (
    <View style={styles.container}>
      {dataToDisplay.map((item, index) => (
        <View>
          <Item {...item} />
          <Optional condition={index !== dataToDisplay.length - 1}>
            <Divider />
          </Optional>
        </View>
      ))}
      <Optional condition={data.length > dataToDisplay.length}>
        <Divider />
        <Button label="View All" variant={ButtonVariants.Clear} onPress={onViewAll} />
      </Optional>
    </View>
  )
}

export default CvCardListBody
