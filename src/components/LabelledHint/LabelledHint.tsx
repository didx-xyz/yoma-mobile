import React, { useState } from 'react'
import { Pressable } from 'react-native'

import { IconInfo } from '~/assets/images'
import InfoModal from '~/components/InfoModal'
import Text, { MetaLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './LabelledHint.styles'

interface Props {
  label: string
  modalContent: string
}

const LabelledHint = ({ label, modalContent }: Props) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)
  return (
    <>
      <InfoModal visible={showInfoModal} closeModal={() => setShowInfoModal(false)} infoText={modalContent} />
      <Pressable
        onPress={() => setShowInfoModal(true)}
        hitSlop={{ top: 10, bottom: 20, left: 0, right: 0 }}
        style={styles.container}
      >
        <>
          <IconInfo style={styles.icon} />
          <Text.Meta level={MetaLevels.SmallBold} color={Colors.PrimaryGreen}>
            {label}
          </Text.Meta>
        </>
      </Pressable>
    </>
  )
}

export default LabelledHint
