import { ZIcon } from 'assets/images'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import ProfilePhoto from '../ProfilePhoto'
import Text, { Bold } from '../Typography'
import styles from './HomeHeader.styles'

type Props = {
  navigation: any
}

const HomeHeader = ({ navigation }: Props) => {
  return (
    <View style={styles.header}>
      <ProfilePhoto
        borderWidth={3}
        onPress={() => navigation.navigate('Profile')}
        outerRadius={17}
        percent={10}
        profileInnerStyle={styles.profileInnerStyle}
      />
      <TouchableOpacity style={styles.tokensView}>
        <ZIcon />
        <Text.Body style={styles.tokenAmount}>
          <Bold color={Colors.primaryYellow}>1000</Bold>
        </Text.Body>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
