import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextStyles } from '../../styles'
import BackIcon from '../../assets/Images/BackIcon.svg';

import { WithChildren } from '../../types/react.types'
import styles from './HeaderContainer.styles'

type Props = WithChildren<{
  headerText: string
}>

const HeaderContainer = ({
  children,
  headerText
}: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backIconView}>
        <BackIcon />
      </TouchableOpacity>
      <Text
        style={[
          TextStyles.textWhite,
          TextStyles.headerText
        ]}>
        {headerText}
      </Text>
    </View>
  )
}

export default HeaderContainer
