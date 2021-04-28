import { YellowCircleLeft } from 'assets/images'
import { LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { colors, Colors } from 'styles'

import Text, { BodyLevels, HeaderLevels, Span, TextAlign } from '../../components/Typography'
import { AuthCredentials } from '../Auth/Auth.types'
import styles from './Login.styles'
import LoginForm from './LoginForm/LoginForm'

interface Props {
  navigation: any
  onLoginUser: (details: AuthCredentials) => void
}

const Login = ({ navigation, onLoginUser }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeaderContainer
          navigation={navigation}
          headerText={t('login')}
          backgroundColor={colors[Colors.primaryPurple]}
          circleImage={<YellowCircleLeft />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeader}>
            {t('welcomeBack')}
          </Text.Header>
          <LoginForm onLoginUser={onLoginUser} />
          <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.ForgotPassword)}>
            <Text.Body level={BodyLevels.small} align={TextAlign.center} style={styles.forgotPassword}>
              {t('forgotPassword')} ?
            </Text.Body>
          </TouchableOpacity>
          <View style={styles.horizontalLineView}>
            <View style={styles.horizontalLine} />
            <Text.Body color={Colors.primaryDarkGrey} style={styles.orText}>
              {t('or')}
            </Text.Body>
            <View style={styles.horizontalLine} />
          </View>
          <Text.Body level={BodyLevels.small} align={TextAlign.center} style={styles.loginSocial}>
            {t('loginSocial')}
          </Text.Body>
          <View style={styles.social}>
            <SocialRegistration />
          </View>
        </View>
        <Text.Body
          level={BodyLevels.small}
          color={Colors.primaryDarkGrey}
          align={TextAlign.center}
          style={styles.noAccount}
        >
          {t('noAccount')}
          <Span
            color={Colors.primaryGreen}
            align={TextAlign.center}
            onPress={() => navigation.navigate(NavigationRoutes.Register)}
          >
            &nbsp; {t('registerHere')}.
          </Span>
        </Text.Body>
      </ScrollView>
    </ViewContainer>
  )
}

export default Login
