import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import { Colors, colors } from 'styles'

import styles from './Spinner.styles'

type Props = {
  visible: boolean
}

const Spinner = ({ visible }: Props) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={colors[Colors.primaryGreen]} />
        </View>
      </View>
    </Modal>
  )
}

export default Spinner
