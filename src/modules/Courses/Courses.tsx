import React from 'react'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Courses.styles'
import { useTranslation } from 'react-i18next';

interface Props {
  navigation: any
}

const Courses = ({ navigation }: Props) => {
  const { t } = useTranslation();
  return (
    <ViewContainer style={styles.container}>
      <Text style={styles.text}>{t('Courses')}</Text>
    </ViewContainer>
  );
}

export default Courses
