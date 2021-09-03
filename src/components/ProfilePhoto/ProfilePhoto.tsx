import { EditIcon, ProfileIcon } from 'assets/images'
import React from 'react'
import { GestureResponderEvent, Image, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, Colors } from 'styles'

import { CIRCULAR_RADIUS_DIVISOR } from '../../styles/styles.constants'
import Optional from '../Optional'
import ProgressCircle from '../ProgressCircle'
import styles from './ProfilePhoto.styles'

type Props = {
  size: number
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
  size,
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
        color={colors[Colors.PrimaryRed]}
      >
        <View style={profileInnerStyle}>
          <Optional condition={!!uri} fallback={<ProfileIcon height={outerRadius} width={outerRadius} />}>
            <View
              style={[
                styles.imageWrap,
                {
                  width: size,
                  height: size,
                  borderRadius: size / CIRCULAR_RADIUS_DIVISOR,
                },
              ]}
            >
              <Image source={{ uri: uri as string }} style={{ width: size, height: size }} />
            </View>
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
