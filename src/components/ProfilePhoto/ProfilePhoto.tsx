import { ProfileIcon } from 'assets/Images'
import ProgressCircle from 'components/ProgressCircle/ProgressCircle'
import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { WithChildren } from 'types/react.types'

type Props = WithChildren<{
  outerRadius: number
  percent: number
  onPress: (event: GestureResponderEvent) => void
  borderWidth: number
  profileInnerStyle: ViewStyle
}>

const ProfilePhoto = ({ outerRadius, percent, onPress, borderWidth, profileInnerStyle }: Props) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <ProgressCircle radius={outerRadius} percent={percent} borderWidth={borderWidth} color={colors[Colors.tertiary1]}>
        <View style={profileInnerStyle}>
          <ProfileIcon />
        </View>
      </ProgressCircle>
    </TouchableOpacity>
  )
}

export default ProfilePhoto
