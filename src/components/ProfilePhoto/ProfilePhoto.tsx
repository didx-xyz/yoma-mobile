import { EditIcon, ProfileIcon } from 'assets/images'
import ProgressCircle from 'components/ProgressCircle/ProgressCircle'
import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import styles from './ProfilePhoto.styles'

type Props = {
  outerRadius: number
  percent: number
  onPress: (event: GestureResponderEvent) => void
  borderWidth: number
  profileInnerStyle?: ViewStyle
  profileOuterStyle?: ViewStyle
  showEditIcon?: boolean
}

const ProfilePhoto = ({
  outerRadius,
  percent,
  onPress,
  borderWidth,
  profileInnerStyle,
  profileOuterStyle,
  showEditIcon = false,
}: Props) => {
  return (
    <TouchableOpacity style={profileOuterStyle} activeOpacity={1} onPress={onPress}>
      <ProgressCircle radius={outerRadius} percent={percent} borderWidth={borderWidth} color={colors[Colors.tertiary1]}>
        <View style={profileInnerStyle}>
          <ProfileIcon height={outerRadius} width={outerRadius} />
        </View>
      </ProgressCircle>
      {showEditIcon ? (
        <TouchableOpacity style={styles.editIcon} onPress={onPress}>
          <EditIcon />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  )
}

export default ProfilePhoto
