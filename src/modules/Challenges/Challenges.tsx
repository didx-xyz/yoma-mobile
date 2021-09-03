import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Challenges.styles'

const Challenges = () => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Header level={HeaderLevels.H1}>{t('Challenges')}</Text.Header>
    </ViewContainer>
  )
}

export default Challenges
