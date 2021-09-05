import React from 'react'
import { FlatList } from 'react-native'

import * as ReduxTypes from '../../../redux/redux.types'
import styles from './CvViewList.styles'

interface Props {
  data: ReduxTypes.NormalisedData
  RenderItem: React.ElementType
}
const CvViewList = ({ data, RenderItem }: Props) => {
  const { ids, entities } = data
  return (
    <FlatList
      data={ids}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <RenderItem {...entities[item]} />}
      keyExtractor={item => item}
    />
  )
}

export default CvViewList
