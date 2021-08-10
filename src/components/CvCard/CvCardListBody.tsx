import { slice } from 'ramda'
import React from 'react'
import { View } from 'react-native'

import Button, { ButtonVariants } from '../Button'
import Divider from '../Divider'
import { Optional } from '../index'

interface Props {
  data: any[]
  onViewAll: () => void
  Item: any
  maxDisplay?: number
}
const CvCardListBody = ({ data, onViewAll, Item, maxDisplay = 2 }: Props) => {
  const dataToDisplay: typeof data = slice(0, maxDisplay, data)
  return (
    <View style={{ flex: 1, width: '100%' }}>
      {dataToDisplay.map((item, index) => (
        <View>
          <Item {...item} />
          <Divider isVisible={index !== dataToDisplay.length - 1} />
        </View>
      ))}
      <Optional condition={data.length > dataToDisplay.length}>
        <Divider isVisible />
        <Button label="View All" variant={ButtonVariants.Clear} onPress={onViewAll} />
      </Optional>
    </View>
  )
}

export default CvCardListBody
