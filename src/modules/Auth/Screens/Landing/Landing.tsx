import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from 'assets/images'
import { ViewContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import Button, { ButtonVariants } from '../../../../components/Button'
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
      <Text.Header level={HeaderLevels.h4} color={Colors.white} align={TextAlign.center} style={styles.bodyText}>
        {t('landingBodyText')}
      </Text.Header>
      <View style={styles.purpleSemiCircleContainer}>
        <PurpleSemiCircle />
      </View>
      <View style={styles.buttonOuterContainer}>
        <Button label={t('register')} onPress={() => navigation.navigate('Register')} style={styles.registerButton} />
        <Button
          variant={ButtonVariants.Clear}
          labelColor={Colors.white}
          label={t('login')}
          onPress={() => navigation.navigate('Login')}
          style={styles.loginButton}
        />
      </View>
    </ViewContainer>
  )
}

export default Landing
