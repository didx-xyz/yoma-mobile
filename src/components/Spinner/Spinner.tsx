import React from 'react'
import { ActivityIndicator, Modal, Text, View } from 'react-native'
import { Colors, colors } from '../../styles'

import { WithChildren } from '../../types/react.types'
import styles from './Spinner.styles'

type Props =
  WithChildren<{
    visible: boolean,
  }>

const Spinner = ({
  children,
  visible,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors[Colors.tertiary3]} />
      </View>
    </Modal>
  )
}

export default Spinner
