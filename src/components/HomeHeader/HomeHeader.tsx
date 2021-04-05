import { ProfileIcon, ZIcon } from 'assets/Images'
import ProgressCircle from 'components/ProgressCircle/ProgressCircle'
import React, { useEffect } from 'react'
import { BackHandler, Text, TouchableOpacity, View } from 'react-native'
import { colors, Colors, TextStyles } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './HomeHeader.styles'

type Props = WithChildren<{
  headerText?: string
  navigation: any
}>

const HomeHeader = ({ headerText, navigation }: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={1}>
        <ProgressCircle radius={17} percent={10} borderWidth={3} color={colors[Colors.tertiary1]}>
          <View style={styles.profileInnerStyle}>
            <ProfileIcon />
          </View>
        </ProgressCircle>
      </TouchableOpacity>
      <Text>{headerText}</Text>
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text style={[TextStyles.boldText, TextStyles.textSecondary, { paddingLeft: 4 }]}>1000</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
