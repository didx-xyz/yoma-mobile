import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'

import Text, { MetaLevels } from '../Typography'
import styles from './Upload.styles'

type Props = {
  onPress: () => void
}

const Upload = ({ onPress }: Props) => {
  const { t } = useTranslation()
  return (
    <View>
      <Text.Meta level={MetaLevels.small}>{t('Upload certification (if completed)')}</Text.Meta>
      <View style={styles.innerView}>
        <Text.Body>{t('Upload')}</Text.Body>
        <TouchableOpacity style={styles.buttonView} onPress={onPress}>
          <Text.Body>{t('Choose file')}</Text.Body>
        </TouchableOpacity>
      </View>
      <Text.Meta>{t('.pdf’s supported')}</Text.Meta>
    </View>
  )
}

export default Upload
