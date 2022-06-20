import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, View } from 'react-native'

import Button from '~/components/Button'
import Text from '~/components/Typography'

import styles from './InfoModal.styles'

interface Props {
  visible: boolean
  closeModal: () => void
  infoText: string
}

const InfoModal = ({ visible, closeModal, infoText }: Props) => {
  const { t } = useTranslation()
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={closeModal}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text.Body>{infoText}</Text.Body>
          <Button label={t('Close')} onPress={closeModal} style={styles.button} />
        </View>
      </View>
    </Modal>
  )
}

export default InfoModal
