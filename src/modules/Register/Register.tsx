import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { PurpleQuarter } from '~/assets/images'
import { Card, ViewContainer } from '~/components'
import Button from '~/components/Button'
import HeaderLarge from '~/components/HeaderLarge'
import SSO from '~/components/SSO'
import { types as SocialButtonTypes } from '~/components/SocialButton'
import Text, { BodyLevels, HeaderLevels, Link, TextAlign } from '~/components/Typography'
import { Colors } from '~/styles'

import { AuthNavigationRoutes, AuthNavigatorParamsList } from '../AuthNavigation/AuthNavigation.types'
import styles from './Register.styles'

interface Props {
  onAuthWithSocial: (type: SocialButtonTypes.SocialVariants) => void
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Register>
}

const Register = ({ navigation, onAuthWithSocial }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer backgroundColor={Colors.PrimaryYellow} style={styles.container}>
      <HeaderLarge
        navigation={navigation}
        backgroundColor={Colors.PrimaryYellow}
        circleImage={<PurpleQuarter />}
        circleImageStyle={styles.purpleSemiCircleContainer}
      />
      <Card style={styles.card}>
        <Text.Header level={HeaderLevels.H3} align={TextAlign.Center} style={styles.welcomeText}>
          {t('welcome')}
        </Text.Header>
        <Button
          label={t('registerWithEmail')}
          onPress={() => navigation.navigate(AuthNavigationRoutes.RegisterWithEmail)}
          style={styles.button}
        />
        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
          <Text.Body style={styles.orText}>{t('or')}</Text.Body>
          <View style={styles.horizontalLine} />
        </View>
        <Text.Body level={BodyLevels.Small} style={styles.bodyText}>
          {t('registerSocial')}
        </Text.Body>
        <SSO onAuthWithSocial={onAuthWithSocial} />
      </Card>
      <Text.Body level={BodyLevels.Small} align={TextAlign.Center} style={styles.bottomText}>
        {t('alreadyHaveAccount')}&nbsp;
        <Link onPress={() => navigation.navigate(AuthNavigationRoutes.Login)}>{t('login')}.</Link>
      </Text.Body>
    </ViewContainer>
  )
}

export default Register
