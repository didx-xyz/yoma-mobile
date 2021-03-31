import React from 'react'
import { View, ViewStyle } from 'react-native'
import { WithChildren } from '../../types/react.types'
import styles from './LargeHeaderContainer.styles'
import WhiteLogo from '../../assets/Images/WhiteLogo.svg';
import HeaderContainer from '../HeaderContainer/HeaderContainer';

type Props =
  WithChildren<{
    style?: ViewStyle,
    headerText: string,
    // TODO: Need to check Svg type
    circleImage: SVGElement,
    circleImageStyle: ViewStyle,
    backgroundColor: string
  }>

const LargeHeaderContainer = ({
  children,
  style,
  headerText,
  circleImage,
  circleImageStyle,
  backgroundColor,
}: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }, style]}>
      {children}
      <HeaderContainer headerText={headerText} />
      <View style={styles.logoContainer}>
        <WhiteLogo />
      </View>
      <View style={circleImageStyle}>
        {circleImage}
      </View>
    </View>
  )
}

export default LargeHeaderContainer
