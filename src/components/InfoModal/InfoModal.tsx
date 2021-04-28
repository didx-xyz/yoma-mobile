import Text from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, View, TouchableOpacity } from 'react-native'
import { Colors } from 'styles'

import styles from './InfoModal.styles'

interface Props {
  visible: boolean
  closeModal: () => void
  infoText: string
}

const InfoModal = ({ visible, closeModal, infoText, ...props }: Props) => {
  const { t } = useTranslation()
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal} {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text.Body>{infoText}</Text.Body>
          <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text.Body color={Colors.white}>{t('Close')}</Text.Body>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default InfoModal
