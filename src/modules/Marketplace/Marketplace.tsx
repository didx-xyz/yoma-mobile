import React from 'react'
import { Button, Text, View } from 'react-native'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './Marketplace.styles'
import { useTranslation } from 'react-i18next';

interface Props {
  navigation: any
}

const Marketplace = ({ navigation }: Props) => {
  const { t } = useTranslation();
  return (
    <ViewContainer style={styles.container}>
      <Text style={styles.text}>{t('Marketplace')}</Text>
    </ViewContainer>
  );
}

export default Marketplace
