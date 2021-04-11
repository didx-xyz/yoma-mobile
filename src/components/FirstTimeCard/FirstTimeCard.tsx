import { BlueRightCircle, LightYellowPattern, RLabsLogo } from 'assets/images'
import { ButtonContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

import styles from './FirstTimeCard.styles'

type Props = {
  navigation: any
}

const FirstTimeCard = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <View style={styles.cardView}>
      <Text style={[TextStyles.h3, TextStyles.boldText, TextStyles.textWhite]}>
        {t('Complete')}
        <Text style={[TextStyles.textTertiary7]}>&nbsp;{t('your Cv')}</Text>
      </Text>
      <Text
        style={[
          TextStyles.h4,
          TextStyles.textTertiary7,
          TextStyles.semiBoldText,
          {
            zIndex: 1,
            marginTop: 5,
          },
        ]}
      >
        {t('Future proof your career and earn')}
        <Text style={[TextStyles.boldText]}> 30 ZLTO </Text>
        {t('by completing our first challenge')}.
      </Text>
      <View style={styles.hostedText}>
        <Text style={[TextStyles.h5]}>{t('Hosted by')} </Text>
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
      <Text style={[TextStyles.textTertiary7, TextStyles.semiBoldText, styles.percentText]}>1% complete</Text>
      <ButtonContainer
        buttonText={t<string>('Let’s do it')}
        buttonStyle={[ButtonStyles.largeTertiary3Button, styles.buttonStyle]}
        buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
        onPress={() => {}}
      />
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
