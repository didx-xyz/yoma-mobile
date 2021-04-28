import { BlueRightCircle, LightYellowPattern, RLabsLogo } from 'assets/images'
import { ButtonContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors, TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

import Button, { ButtonSizes } from '../Button'
import Text, { Bold, FontWeights, HeaderLevels, Span } from '../Typography'
import styles from './FirstTimeCard.styles'

type Props = {
  navigation: any
}

const FirstTimeCard = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.cardView}>
      <Text.Header level={HeaderLevels.h3} color={Colors.white}>
        {t('Complete')}
        <Span color={Colors.secondaryDarkBlue}>&nbsp;{t('your CV')}</Span>
      </Text.Header>
      <Text.Header level={HeaderLevels.h6} color={Colors.secondaryDarkBlue} style={styles.bodyText}>
        {t('Future proof your career and earn')}
        <Bold> 30 ZLTO </Bold>
        {t('by completing our first challenge')}.
      </Text.Header>
      <View style={styles.hostedText}>
        <Text.Body>{t('Hosted by')}</Text.Body>
        <RLabsLogo />
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.innerProgressbar,
            {
              width: '50%',
            },
          ]}
        />
      </View>
      <Text.Header level={HeaderLevels.h6} weight={FontWeights.bold_700} style={styles.percentText}>
        {t('1% complete')}
      </Text.Header>
      <Button label={t('Let’s do it')} onPress={() => {}} size={ButtonSizes.Slim} style={styles.buttonStyle} />
      <View style={styles.blueCircle}>
        <BlueRightCircle />
      </View>
      <View style={styles.yellowPattern}>
        <LightYellowPattern />
      </View>
    </View>
  )
}

export default FirstTimeCard
