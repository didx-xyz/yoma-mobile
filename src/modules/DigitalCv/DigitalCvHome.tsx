import React from 'react'
import { useTranslation } from 'react-i18next'

import Text, { HeaderLevels } from '../../components/Typography'
import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './DigitalCvHome.styles'

interface Props {
  navigation: any
}

const DigitalCvHome = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Header level={HeaderLevels.h1}>{t('signUpPlease')}</Text.Header>
    </ViewContainer>
  )
}

export default DigitalCvHome
