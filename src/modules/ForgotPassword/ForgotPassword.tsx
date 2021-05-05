import { Message, YellowCircleRight } from 'assets/images'
import { ButtonContainer, LargeHeaderContainer, Optional, ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { openInbox } from 'react-native-email-link'
import { colors, Colors } from 'styles'
import ButtonStyles from 'styles/button.styles'

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
            <View style={styles.whiteCard}>
              <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeaderText}>
                {t('forgotYourPassword')} ?
              </Text.Header>
              <Text.Body color={Colors.primaryDarkGrey} style={styles.bodyText}>
                {t('forgotPasswordText')}
              </Text.Body>
              <ForgotPasswordForm setSubmitted={() => setEmailSent(true)} />
            </View>
          }
        >
          <View style={styles.whiteCard}>
            <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeaderText}>
              {t('checkEmail')}
            </Text.Header>
            <View style={styles.logoContainer}>
              <Message />
            </View>
            <Text.Body color={Colors.primaryDarkGrey} style={styles.bodyText}>
              {t('passwordSentText')}
            </Text.Body>
            <ButtonContainer
              buttonText={t<string>('openEmail')}
              buttonStyle={[ButtonStyles.largeTertiary3Button, styles.button]}
              onPress={() => openInbox()}
            />
            <TouchableOpacity onPress={() => navigation.navigate(NavigationRoutes.Login)}>
              <Text.Header level={HeaderLevels.h5} align={TextAlign.center} color={Colors.primaryGreen}>
                {t('skipComplete')}
              </Text.Header>
            </TouchableOpacity>
          </View>
        </Optional>
      </ScrollView>
    </ViewContainer>
  )
}

export default ForgotPassword
