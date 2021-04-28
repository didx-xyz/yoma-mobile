import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from 'assets/images'
import { ButtonContainer, ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'
import ButtonStyles from 'styles/button.styles'

import Text, { HeaderLevels, Span, TextAlign } from '../../../../components/Typography'
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
      <Text.Header level={HeaderLevels.h1} align={TextAlign.center}>
        {t('unlock')}
        {'\n'}
        <Span color={Colors.white}>{t('yourFuture')}</Span>
      </Text.Header>
      <Text.Body align={TextAlign.center} style={styles.bodyText}>
        <Span color={Colors.white}>{t('landingBodyText')}</Span>
      </Text.Body>
      <View style={styles.purpleSemiCircleContainer}>
        <PurpleSemiCircle />
      </View>
      <View style={styles.buttonOuterContainer}>
        <ButtonContainer
          buttonText={t<string>('register')}
          buttonStyle={ButtonStyles.mediumTertiary3Button}
          onPress={() => navigation.navigate(NavigationRoutes.Register)}
        />
        <ButtonContainer
          buttonText={t<string>('login')}
          buttonStyle={[ButtonStyles.transparentButton, styles.secondaryButton]}
          onPress={() => navigation.navigate(NavigationRoutes.Login)}
        />
      </View>
    </ViewContainer>
  )
}

export default Landing
