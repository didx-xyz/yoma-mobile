import { RedSemiCircle, WhiteLogo, PurpleSemiCircle } from 'assets/Images'
import { ButtonContainer, ViewContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

import styles from './Landing.styles'

interface Props {
  navigation: any
}

const Landing = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <View style={styles.redSemiCircleContainer}>
        <RedSemiCircle />
      </View>
      <View style={styles.logoContainer}>
        <WhiteLogo />
      </View>
      <Text style={[TextStyles.h1, TextStyles.textPrimary, styles.mainBodyText]}>
        {t('unlock')}
        {'\n'}
        <Text style={[TextStyles.h1, TextStyles.textWhite]}>{t('yourFuture')}</Text>
      </Text>
      <Text style={[TextStyles.h4, TextStyles.textWhite, styles.bodyText]}>{t('landingBodyText')}</Text>
      <View style={styles.purpleSemiCircleContainer}>
        <PurpleSemiCircle />
      </View>
      <View style={styles.buttonOuterContainer}>
        <ButtonContainer
          buttonText={t<string>('register')}
          buttonStyle={[ButtonStyles.mediumTertiary3Button]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('Register')}
        />
        <ButtonContainer
          buttonText={t<string>('login')}
          buttonStyle={[ButtonStyles.transparentButton, { marginTop: 10 }]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </ViewContainer>
  )
}

export default Landing
