import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { YellowCircleLeft } from '~/assets/images'
import { Card, ViewContainer } from '~/components'
import HeaderLarge from '~/components/HeaderLarge'
import SSO from '~/components/SSO'
import { SocialVariants } from '~/components/SocialButton/SocialButton.types'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from '~/modules/AuthNavigation/AuthNavigation.types'
import { Colors } from '~/styles'

import Text, { BodyLevels, HeaderLevels, Link, TextAlign } from '../../components/Typography'
import { StatusBarStyle } from '../../components/ViewContainer/ViewContainer.types'
import styles from './Login.styles'
import LoginForm from './LoginForm/LoginForm'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Login>
  onAuthWithSocial: (provider: SocialVariants) => void
  form: FormikProps<any>
}

const Login = ({ navigation, onAuthWithSocial, form }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer
      backgroundColor={Colors.PrimaryPurple}
      statusBarStyle={StatusBarStyle.LightContent}
      style={styles.container}
    >
      <ScrollView>
        <HeaderLarge
          navigation={navigation}
          backgroundColor={Colors.PrimaryPurple}
          circleImage={<YellowCircleLeft />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        <Card style={styles.card}>
          <Text.Header level={HeaderLevels.H3} align={TextAlign.Center} style={styles.cardHeader}>
            {t('welcomeBack')}
          </Text.Header>
          <LoginForm form={form} />
          <Text.Body
            level={BodyLevels.Small}
            align={TextAlign.Center}
            style={styles.forgotPassword}
            onPress={() => navigation.navigate(AuthNavigationRoutes.ForgotPassword)}
          >
            {t('forgotPassword')}?
          </Text.Body>
          <View style={styles.horizontalLineView}>
            <View style={styles.horizontalLine} />
            <Text.Body color={Colors.PrimaryDarkGrey} style={styles.orText}>
              {t('or')}
            </Text.Body>
            <View style={styles.horizontalLine} />
          </View>
          <Text.Body level={BodyLevels.Small} align={TextAlign.Center} style={styles.loginSocial}>
            {t('loginSocial')}
          </Text.Body>
          <View style={styles.social}>
            <SSO onAuthWithSocial={onAuthWithSocial} />
          </View>
        </Card>
        <Text.Body
          level={BodyLevels.Small}
          color={Colors.PrimaryDarkGrey}
          align={TextAlign.Center}
          style={styles.noAccount}
        >
          {t('noAccount')}
          <Link onPress={() => navigation.navigate(AuthNavigationRoutes.Register)}>&nbsp;{t('registerHere')}.</Link>
        </Text.Body>
      </ScrollView>
    </ViewContainer>
  )
}

export default Login
