import { EditIcon, ProfileIcon } from 'assets/images'
import React from 'react'
import { GestureResponderEvent, Image, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import Optional from '../Optional'
import ProgressCircle from '../ProgressCircle'
import styles from './ProfilePhoto.styles'

type Props = {
  outerRadius: number
  percent: number
  onPress: (event: GestureResponderEvent) => void
  borderWidth: number
  uri?: string | null
  showEditIcon?: boolean
  profileInnerStyle?: ViewStyle
  profileOuterStyle?: ViewStyle
}

const ProfilePhoto = ({
  outerRadius,
  percent,
  onPress,
  borderWidth,
  profileInnerStyle,
  profileOuterStyle,
  uri = '',
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
          <Optional condition={uri !== ''} fallback={<ProfileIcon height={outerRadius} width={outerRadius} />}>
            <Image source={{ uri: uri as string }} style={{ width: outerRadius, height: outerRadius }} />
          </Optional>
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
