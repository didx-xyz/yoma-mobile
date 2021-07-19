import React from 'react'
import { StatusBar, StatusBarProps, View, ViewStyle } from 'react-native'
import { WithChildren } from 'types/react.types'

import { Colors, colors } from '../../styles'
import styles from './ViewContainer.styles'
import { StatusBarStyle } from './ViewContainer.types'

type Props = StatusBarProps &
  WithChildren<{
    statusHidden?: boolean
    statusBarStyle?: StatusBarStyle
    backgroundColor?: Colors
    style?: ViewStyle
  }>

const ViewContainer = ({
  children,
  statusBarStyle = StatusBarStyle.darkContent,
  statusHidden = false,
  backgroundColor = Colors.white,
  style,
  ...statusBarProps
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar
        hidden={statusHidden}
        barStyle={statusBarStyle}
        backgroundColor={colors[backgroundColor]}
        {...statusBarProps}
      />
      {children}
    </View>
  )
}

export default ViewContainer
