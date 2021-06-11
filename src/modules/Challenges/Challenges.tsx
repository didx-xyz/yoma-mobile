import Text from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Challenges.styles'

const Challenges = () => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Body>{t('Challenges')}</Text.Body>
    </ViewContainer>
  )
}

export default Challenges
