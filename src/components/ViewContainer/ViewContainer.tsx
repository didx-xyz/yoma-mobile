import React from 'react'
import { StatusBar, StatusBarProps, View, ViewStyle } from 'react-native'

import { WithChildren } from 'types/react.types'
import styles from './ViewContainer.styles'
import { StatusBarStyle } from './ViewContainer.types'

type Props = StatusBarProps &
  WithChildren<{
    statusHidden?: boolean
    statusBarStyle?: StatusBarStyle
    style?: ViewStyle
  }>

const ViewContainer = ({
  children,
  statusBarStyle = StatusBarStyle.darkContent,
  statusHidden = false,
  style,
  ...statusBarProps
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar hidden={statusHidden} barStyle={statusBarStyle} {...statusBarProps} />
      {children}
    </View>
  )
}

export default ViewContainer
