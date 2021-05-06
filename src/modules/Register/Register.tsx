import { PurpleQuarter } from 'assets/images'
import { Card, LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components'
import Button, { ButtonSizes } from 'components/Button'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors, colors } from 'styles'

import Text, { BodyLevels, HeaderLevels, Link, TextAlign } from '../../components/Typography'
import styles from './Register.styles'

interface Props {
  navigation: any
}

const Register = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <LargeHeaderContainer
        navigation={navigation}
        headerText={t<string>('register')}
        backgroundColor={colors[Colors.primaryYellow]}
        circleImage={<PurpleQuarter />}
        circleImageStyle={styles.purpleSemiCircleContainer}
      />
      <Card style={styles.card}>
        <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.welcomeText}>
          {t('welcome')}
        </Text.Header>
        <Button
          size={ButtonSizes.Default}
          label={t('registerWithEmail')}
          onPress={() => navigation.navigate(NavigationRoutes.RegisterWithEmail)}
          style={styles.button}
        />
        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
          <Text.Body style={styles.orText}>{t('or')}</Text.Body>
          <View style={styles.horizontalLine} />
        </View>
        <Text.Body level={BodyLevels.small} style={styles.bodyText}>
          {t('registerSocial')}
        </Text.Body>
        <SocialRegistration />
      </Card>
      <Text.Body level={BodyLevels.small} align={TextAlign.center} style={styles.bottomText}>
        {t('alreadyHaveAccount')}&nbsp;
        <Link onPress={() => navigation.navigate(NavigationRoutes.Login)}>{t('login')}.</Link>
      </Text.Body>
    </ViewContainer>
  )
}

export default Register
