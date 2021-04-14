import Text from 'components/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Courses.styles'

interface Props {
  navigation: any
}

const Courses = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <Text.Body>{t('Courses')}</Text.Body>
    </ViewContainer>
  )
}

export default Courses
