import { StackNavigationProp } from '@react-navigation/stack'
import { Message, YellowCircleRight } from 'assets/images'
import { Card, LargeHeader, Optional, ViewContainer } from 'components'
import Button from 'components/Button'
import { AuthNavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import { AuthNavigatorParamsList } from 'modules/AppNavigation/Authentication/Authentication.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { openInbox } from 'react-native-email-link'
import { Colors } from 'styles'

import Text, { HeaderLevels, TextAlign } from '../../components/Typography'
import styles from './ForgotPassword.styles'
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.ForgotPassword>
}

const ForgotPassword = ({ navigation }: Props) => {
  const [emailSent, setEmailSent] = useState(false)
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeader
          navigation={navigation}
          backgroundColor={Colors.secondaryPurple}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        <Optional
          condition={emailSent}
          fallback={
            <Card style={styles.card}>
              <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeaderText}>
                {t('forgotYourPassword')}?
              </Text.Header>
              <Text.Body color={Colors.primaryDarkGrey} style={styles.bodyText}>
                {t('forgotPasswordText')}
              </Text.Body>
              <ForgotPasswordForm setSubmitted={() => setEmailSent(true)} />
            </Card>
          }
        >
          <Card style={styles.card}>
            <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeaderText}>
              {t('checkEmail')}
            </Text.Header>
            <View style={styles.logoContainer}>
              <Message />
            </View>
            <Text.Body color={Colors.primaryDarkGrey} style={styles.bodyText}>
              {t('passwordSentText')}
            </Text.Body>
            <Button label={t('openEmail')} onPress={openInbox} />
            <Text.Header
              onPress={() => navigation.navigate(AuthNavigationRoutes.Login)}
              level={HeaderLevels.h5}
              color={Colors.primaryGreen}
              align={TextAlign.center}
              style={styles.skipButton}
            >
              {t('skipComplete')}
            </Text.Header>
          </Card>
        </Optional>
      </ScrollView>
    </ViewContainer>
  )
}

export default ForgotPassword
