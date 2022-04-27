import React, { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'

import { WithChildren } from '~/types/react.types'

const getDirection = (row: boolean, column: boolean) => ((column && row) || row ? 'row' : 'column')

type Props = WithChildren<{
  isRow?: boolean
  isColumn?: boolean
}>
const Flex = ({ children, isRow = false, isColumn = true }: Props) => {
  const [style, setStyle] = useState<ViewStyle>()

  useEffect(() => {
    const direction = getDirection(isRow, isColumn)
    setStyle({ flexDirection: direction })
  }, [isRow, isColumn])

  return <View style={style}>{children}</View>
}

export const FlexRow = (props: Props) => <Flex isRow={true} {...props} />
export const FlexCol = (props: Props) => <Flex isColumn={true} {...props} />

export default Flex
