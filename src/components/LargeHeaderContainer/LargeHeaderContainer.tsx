import { WhiteLogo } from 'assets/Images'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { WithChildren } from 'types/react.types'

import HeaderContainer from '../HeaderContainer/HeaderContainer'
import styles from './LargeHeaderContainer.styles'

type Props = WithChildren<{
  style?: ViewStyle
  headerText: string
  // TODO: Need to check Svg type
  circleImage: SVGElement
  circleImageStyle: ViewStyle
  backgroundColor: string
  navigation: any
}>

const LargeHeaderContainer = ({
  children,
  style,
  headerText,
  circleImage,
  circleImageStyle,
  backgroundColor,
  navigation,
}: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }, style]}>
      {children}
      <HeaderContainer navigation={navigation} headerText={headerText} />
      <View style={styles.logoContainer}>
        <WhiteLogo />
      </View>
      <View style={circleImageStyle}>{circleImage}</View>
    </View>
  )
}

export default LargeHeaderContainer
