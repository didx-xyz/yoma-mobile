import React from 'react'
import { useTranslation } from 'react-i18next'

import Text, { HeaderLevels } from '~/components/Typography'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Marketplace.styles'

const Marketplace = () => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Header level={HeaderLevels.H1}>{t('Marketplace')}</Text.Header>
    </ViewContainer>
  )
}

export default Marketplace
