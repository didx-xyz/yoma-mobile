import React from 'react'
import { Text, Modal, View, TouchableOpacity } from 'react-native'
import { TextStyles } from 'styles'

import styles from './InfoModal.styles'

interface Props {
  visible: boolean
  closeModal: () => void
  infoText: string
}

const InfoModal = ({ visible, closeModal, infoText, ...props }: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal} {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[TextStyles.h4, TextStyles.textTertiary9, styles.modalText]}>{infoText}</Text>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default InfoModal
