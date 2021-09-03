import Text, { HeaderLevels } from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Courses.styles'

const Courses = () => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Header level={HeaderLevels.H1}>{t('Courses')}</Text.Header>
    </ViewContainer>
  )
}

export default Courses
