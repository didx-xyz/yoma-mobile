import { EditIcon, ProfileIcon } from 'assets/images'
import React from 'react'
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import Optional from '../Optional'
import ProgressCircle from '../ProgressCircle'
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
      <ProgressCircle
        radius={outerRadius}
        percent={percent}
        borderWidth={borderWidth}
        color={colors[Colors.primaryRed]}
      >
        <View style={profileInnerStyle}>
          <ProfileIcon height={outerRadius} width={outerRadius} />
        </View>
      </ProgressCircle>
      <Optional condition={showEditIcon}>
        <TouchableOpacity style={styles.editIcon} onPress={onPress}>
          <EditIcon />
        </TouchableOpacity>
      </Optional>
    </TouchableOpacity>
  )
}

export default ProfilePhoto
