import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { WithChildren } from '~/types/react.types'

const getDirection = (row: boolean, column: boolean) => ((column && row) || row ? 'row' : 'column')

type Props = WithChildren<{
  isRow?: boolean
  isColumn?: boolean
  style?: ViewStyle
}>
const Stack = ({ style = {}, children, isRow = false, isColumn = true }: Props) => {
  const [styles, setStyles] = useState<ViewStyle>()

  useEffect(() => {
    const direction = getDirection(isRow, isColumn)
    setStyles(prevStyle => StyleSheet.flatten([prevStyle, { flexDirection: direction }]))
  }, [isRow, isColumn])

  const containerStyles = useMemo(() => StyleSheet.flatten([style, styles]), [style, styles])

  return <View style={containerStyles}>{children}</View>
}

export const HStack = (props: Props) => <Stack isRow={true} {...props} />
export const VStack = (props: Props) => <Stack isColumn={true} {...props} />

export default Stack
