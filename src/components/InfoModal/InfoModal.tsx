import React, { useState } from 'react'
import { Text, Modal, View, Pressable, TouchableOpacity } from 'react-native'
import { TextStyles } from 'styles'
import { WithChildren } from 'types/react.types'

import styles from './InfoModal.styles'

type Props = WithChildren<{
  visible: boolean
  closeModal: () => void
  infoText: string
}>

const InfoModal = ({ children, visible, closeModal, infoText, ...props }: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
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
