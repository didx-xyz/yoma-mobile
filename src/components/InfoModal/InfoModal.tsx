import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, View } from 'react-native'

import Button from '../Button'
import Text from '../Typography'
import styles from './InfoModal.styles'

interface Props {
  visible: boolean
  closeModal: () => void
  infoText: string
}

const InfoModal = ({ visible, closeModal, infoText }: Props) => {
  const { t } = useTranslation()
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text.Body>{infoText}</Text.Body>
          <Button label={t('close')} onPress={closeModal} style={styles.button} />
        </View>
      </View>
    </Modal>
  )
}

export default InfoModal
