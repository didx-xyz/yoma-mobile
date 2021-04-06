import { ZIcon } from 'assets/Images'
import ProfilePhoto from 'components/ProfilePhoto/ProfilePhoto'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextStyles } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './HomeHeader.styles'

type Props = WithChildren<{
  navigation: any
}>

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
        <Text style={[TextStyles.boldText, TextStyles.textSecondary, { paddingLeft: 4 }]}>1000</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader
