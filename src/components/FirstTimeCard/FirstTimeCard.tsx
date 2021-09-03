import { BlueRightCircle, LightYellowPattern, RLabsLogo } from 'assets/images'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import Background from '../Background/Background'
import Button, { ButtonSizes } from '../Button'
import Text, { Bold, FontWeights, HeaderLevels, Span } from '../Typography'
import styles from './FirstTimeCard.styles'

const FirstTimeCard = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Background>
        <View style={styles.blueCircle}>
          <BlueRightCircle />
        </View>
        <View style={styles.yellowPattern}>
          <LightYellowPattern />
        </View>
      </Background>
      <Text.Header level={HeaderLevels.H3} color={Colors.White}>
        {t('Complete')}
        <Span color={Colors.SecondaryDarkBlue}>&nbsp;{t('your CV')}</Span>
      </Text.Header>
      <Text.Header level={HeaderLevels.H6} color={Colors.SecondaryDarkBlue} style={styles.bodyText}>
        {t('Future proof your career and earn')}
        <Bold> 30 ZLTO </Bold>
        {t('by completing our first challenge')}.
      </Text.Header>
      <View style={styles.hostedText}>
        <Text.Body color={Colors.SecondaryDarkBlue}>{t('Hosted by')}</Text.Body>
        <RLabsLogo />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.innerProgressbar} />
      </View>
      <Text.Header level={HeaderLevels.H6} weight={FontWeights.Bold700} style={styles.percentText}>
        {t('1% complete')}
      </Text.Header>
      <Button label={t('Let’s do it')} onPress={() => {}} size={ButtonSizes.Slim} />
    </View>
  )
}

export default FirstTimeCard
