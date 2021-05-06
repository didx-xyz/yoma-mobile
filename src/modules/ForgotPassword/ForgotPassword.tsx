import { Message, YellowCircleRight } from 'assets/images'
import { Card, LargeHeaderContainer, Optional, ViewContainer } from 'components'
import Button from 'components/Button'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { openInbox } from 'react-native-email-link'
import { colors, Colors } from 'styles'

import Text, { HeaderLevels, TextAlign } from '../../components/Typography'
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
        <LargeHeaderContainer
          navigation={navigation}
          headerText={t('forgotPassword')}
          backgroundColor={colors[Colors.secondaryPurple]}
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
            <Button label={t('openEmail')} onPress={openInbox} style={styles.button} />
            <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.Login)} style={styles.skipButton}>
              <Text.Header level={HeaderLevels.h5} align={TextAlign.center} color={Colors.primaryGreen}>
                {t('skipComplete')}
              </Text.Header>
            </TouchableOpacity>
          </Card>
        </Optional>
      </ScrollView>
    </ViewContainer>
  )
}

export default ForgotPassword
