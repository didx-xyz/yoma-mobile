import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal as RNModal, View } from 'react-native'

import Button, { ButtonSizes, ButtonVariants } from '~/components/Button'
import { WithChildren } from '~/types/react.types'

import styles from './Modal.style'

type Props = WithChildren<{
  setVisible: (state: boolean) => void
  closeLabel?: string
  isVisible: boolean
}>

const Modal = ({ setVisible, isVisible, closeLabel, children }: Props) => {
  const { t } = useTranslation()
  const handleCloseModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  return (
    <RNModal visible={isVisible} transparent animationType={'fade'} hardwareAccelerated statusBarTranslucent>
      <View style={styles.modalOverlay} />
      <View style={styles.modal}>
        <Button
          style={styles.button}
          size={ButtonSizes.Default}
          label={closeLabel || t('Done')}
          onPress={handleCloseModal}
          variant={ButtonVariants.Clear}
        />
        {children}
      </View>
    </RNModal>
  )
}
export default Modal
