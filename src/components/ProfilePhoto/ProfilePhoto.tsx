import { EditIcon, ProfileIcon } from 'assets/images'
import ProgressCircle from 'components/ProgressCircle/ProgressCircle'
import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './ProfilePhoto.styles'

type Props = WithChildren<{
  outerRadius: number
  percent: number
  onPress: (event: GestureResponderEvent) => void
  borderWidth: number
  profileInnerStyle?: ViewStyle
  profileOuterStyle?: ViewStyle
  editIcon?: boolean
}>

const ProfilePhoto = ({
  outerRadius,
  percent,
  onPress,
  borderWidth,
  profileInnerStyle,
  profileOuterStyle,
  editIcon = false,
}: Props) => {
  return (
    <TouchableOpacity style={profileOuterStyle} activeOpacity={1} onPress={onPress}>
      <ProgressCircle radius={outerRadius} percent={percent} borderWidth={borderWidth} color={colors[Colors.tertiary1]}>
        <View style={profileInnerStyle}>
          <ProfileIcon height={outerRadius} width={outerRadius} />
        </View>
      </ProgressCircle>
      {editIcon ? (
        <TouchableOpacity style={styles.editIcon} onPress={onPress}>
          <EditIcon />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  )
}

export default ProfilePhoto
