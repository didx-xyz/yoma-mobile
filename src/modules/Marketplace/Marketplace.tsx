import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Marketplace.styles'

interface Props {
  navigation: any
}

const Marketplace = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Header level={HeaderLevels.h1}>{t('Marketplace')}</Text.Header>
    </ViewContainer>
  )
}

export default Marketplace
