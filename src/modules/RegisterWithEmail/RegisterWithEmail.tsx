import { StackNavigationProp } from '@react-navigation/stack'
import { YellowCircleRight } from 'assets/images'
import { Card, LargeHeader, ViewContainer } from 'components'
import { AuthRegistration } from 'modules/Auth/Auth.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import Text, { BodyLevels, HeaderLevels, Link, TextAlign } from '../../components/Typography'
import { types as AuthNavigationTypes } from '../AuthNavigation'
import RegisterForm from './RegisterForm/RegisterForm'
import styles from './RegisterWithEmail.styles'

interface Props {
  navigation: StackNavigationProp<
    AuthNavigationTypes.AuthNavigationParamsList,
    AuthNavigationTypes.AuthNavigationRoutes.RegisterWithEmail
  >
  onRegisterUser: (details: AuthRegistration) => void
}

const RegisterWithEmail = ({ navigation, onRegisterUser }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeader
          navigation={navigation}
          backgroundColor={Colors.secondaryPurple}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowCircleContainer}
        />
        <Card style={styles.card}>
          <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.registerText}>
            {t('register')}
          </Text.Header>
          <RegisterForm onRegisterUser={onRegisterUser} />
        </Card>
        <Text.Body level={BodyLevels.small} align={TextAlign.center} style={styles.notice}>
          {t('alreadyHaveAccount')}&nbsp;
          <Link onPress={() => navigation.navigate(AuthNavigationTypes.AuthNavigationRoutes.Login)}>{t('login')}.</Link>
        </Text.Body>
      </ScrollView>
    </ViewContainer>
  )
}

export default RegisterWithEmail
