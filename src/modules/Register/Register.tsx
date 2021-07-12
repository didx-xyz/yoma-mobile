import { StackNavigationProp } from '@react-navigation/stack'
import { PurpleQuarter } from 'assets/images'
import { Card, SocialRegistration, ViewContainer } from 'components'
import Button from 'components/Button'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from 'modules/AuthNavigation/AuthNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import LargeHeader from '../../components/LargeHeader'
import Text, { BodyLevels, HeaderLevels, Link, TextAlign } from '../../components/Typography'
import styles from './Register.styles'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Register>
}

const Register = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <LargeHeader
        navigation={navigation}
        backgroundColor={Colors.primaryYellow}
        circleImage={<PurpleQuarter />}
        circleImageStyle={styles.purpleSemiCircleContainer}
      />
      <Card style={styles.card}>
        <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.welcomeText}>
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
        <Text.Body level={BodyLevels.small} style={styles.bodyText}>
          {t('registerSocial')}
        </Text.Body>
        <SocialRegistration />
      </Card>
      <Text.Body level={BodyLevels.small} align={TextAlign.center} style={styles.bottomText}>
        {t('alreadyHaveAccount')}&nbsp;
        <Link onPress={() => navigation.navigate(AuthNavigationRoutes.Login)}>{t('login')}.</Link>
      </Text.Body>
    </ViewContainer>
  )
}

export default Register
