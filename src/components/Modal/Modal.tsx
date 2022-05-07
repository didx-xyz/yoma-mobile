import React, { useEffect, useState } from 'react'
import { Modal as RNModal, View } from 'react-native'

import Button, { ButtonSizes, ButtonVariants } from '~/components/Button'
import { WithChildren } from '~/types/react.types'

import styles from './Modal.style'

type Props = WithChildren<{
  onClose: () => void
  isVisible: boolean
}>

const Modal = ({ onClose, isVisible, children }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setModalVisible(isVisible)
  }, [isVisible])

  return (
    <RNModal visible={isModalVisible} transparent animationType={'fade'} hardwareAccelerated statusBarTranslucent>
      <View style={styles.modalOverlay} />
      <View style={styles.modal}>
        <Button
          style={styles.button}
          size={ButtonSizes.Default}
          label="Done"
          onPress={() => {
            setModalVisible(false)
            onClose()
          }}
          variant={ButtonVariants.Clear}
        />
        {children}
      </View>
    </RNModal>
  )
}
export default Modal
