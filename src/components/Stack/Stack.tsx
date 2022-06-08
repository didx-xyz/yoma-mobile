import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import { WithChildren } from '~/types/react.types'

const getDirection = (row: boolean, column: boolean) => ((column && row) || row ? 'row' : 'column')

type Props = WithChildren<{
  isRow?: boolean
  isColumn?: boolean
  styles?: ViewStyle
}>
const Stack = ({ styles = {}, children, isRow = false, isColumn = true }: Props) => {
  const [style, setStyle] = useState<ViewStyle>()

  useEffect(() => {
    const direction = getDirection(isRow, isColumn)
    setStyle(prevStyle => StyleSheet.flatten([prevStyle, { flexDirection: direction }]))
  }, [isRow, isColumn])

  const containerStyles = useMemo(() => StyleSheet.flatten([styles, style]), [style, styles])

  return <View style={containerStyles}>{children}</View>
}

export const HStack = (props: Props) => <Stack isRow={true} {...props} />
export const VStack = (props: Props) => <Stack isColumn={true} {...props} />

export default Stack
