import React, { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'

import { WithChildren } from '~/types/react.types'

const getDirection = (row: boolean, column: boolean) => ((column && row) || row ? 'row' : 'column')

type Props = WithChildren<{
  isRow?: boolean
  isColumn?: boolean
}>
const Stack = ({ children, isRow = false, isColumn = true }: Props) => {
  const [style, setStyle] = useState<ViewStyle>()

  useEffect(() => {
    const direction = getDirection(isRow, isColumn)
    setStyle({ flexDirection: direction })
  }, [isRow, isColumn])

  return <View style={style}>{children}</View>
}

export const HStack = (props: Props) => <Stack isRow={true} {...props} />
export const VStack = (props: Props) => <Stack isColumn={true} {...props} />

export default Stack
