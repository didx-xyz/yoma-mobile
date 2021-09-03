import { StackNavigationProp } from '@react-navigation/stack'
import { YellowCircleRight } from 'assets/images'
import { Card, ViewContainer } from 'components'
import { AuthRegistration } from 'modules/Auth/Auth.types'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from 'modules/AuthNavigation/AuthNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import LargeHeader from '../../components/LargeHeader'
import Text, { BodyLevels, HeaderLevels, Link, TextAlign } from '../../components/Typography'
import RegisterForm from './RegisterForm/RegisterForm'
import styles from './RegisterWithEmail.styles'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.RegisterWithEmail>
  onRegisterUser: (details: AuthRegistration) => void
}

const RegisterWithEmail = ({ navigation, onRegisterUser }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeader
          navigation={navigation}
          backgroundColor={Colors.SecondaryPurple}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowCircleContainer}
        />
        <Card style={styles.card}>
          <Text.Header level={HeaderLevels.h3} align={TextAlign.Center} style={styles.registerText}>
            {t('register')}
          </Text.Header>
          <RegisterForm onRegisterUser={onRegisterUser} />
        </Card>
        <Text.Body level={BodyLevels.small} align={TextAlign.Center} style={styles.notice}>
          {t('alreadyHaveAccount')}&nbsp;
          <Link onPress={() => navigation.navigate(AuthNavigationRoutes.Login)}>{t('login')}.</Link>
        </Text.Body>
      </ScrollView>
    </ViewContainer>
  )
}

export default RegisterWithEmail
