import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import CvView from '~/components/CvView'
import Text from '~/components/Typography'

import { AboutNavigation } from '../types'
import styles from './AboutView.styles'

interface Props {
  onEdit: () => void
  biography: string
  navigation: AboutNavigation
}
const AboutView = ({ onEdit, biography, navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <CvView
      title={t('About')}
      noDataMessage={t('Which school, university or college did you attend?')}
      onAction={onEdit}
      isEditAction
      navigation={navigation}
    >
      <View style={styles.container}>
        <Text.Body>{biography}</Text.Body>
      </View>
    </CvView>
  )
}

export default AboutView
