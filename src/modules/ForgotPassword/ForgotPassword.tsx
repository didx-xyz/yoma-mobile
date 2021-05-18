import { Message, YellowCircleRight } from 'assets/images'
import { Card, LargeHeader, Optional, ViewContainer } from 'components'
import Button from 'components/Button'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { openInbox } from 'react-native-email-link'
import { Colors } from 'styles'

import Text, { HeaderLevels, Link, TextAlign } from '../../components/Typography'
import styles from './ForgotPassword.styles'
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm'

interface Props {
  navigation: any
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
            <Link
              onPress={() => navigation.navigate(NavigationRoutes.Login)}
              align={TextAlign.center}
              style={styles.skipButton}
            >
              <Text.Header level={HeaderLevels.h5} color={Colors.primaryGreen}>
                {t('skipComplete')}
              </Text.Header>
            </Link>
          </Card>
        </Optional>
      </ScrollView>
    </ViewContainer>
  )
}

export default ForgotPassword
