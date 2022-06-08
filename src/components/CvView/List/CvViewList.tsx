import React, { ReactElement } from 'react'
import { FlatList } from 'react-native'

import * as ReduxTypes from '~/redux/redux.types'

import styles from './CvViewList.styles'

interface Props {
  data: ReduxTypes.NormalisedData
  RenderItem: React.ElementType
  ListHeader?: ReactElement
}
const CvViewList = ({ data, RenderItem, ListHeader }: Props) => {
  const { ids, entities } = data
  return (
    <FlatList
      data={ids}
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => <RenderItem {...entities[item]} />}
      keyExtractor={item => item}
    />
  )
}

export default CvViewList
