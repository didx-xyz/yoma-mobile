import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { openInbox } from 'react-native-email-link'

import { Message, YellowCircleRight } from '../../assets/images'
import Button from '../../components/Button'
import Card from '../../components/Card'
import HeaderLarge from '../../components/HeaderLarge'
import Optional from '../../components/Optional'
import Text, { HeaderLevels, TextAlign } from '../../components/Typography'
import ViewContainer from '../../components/ViewContainer'
import { StatusBarStyle } from '../../components/ViewContainer/ViewContainer.types'
import { Colors } from '../../styles'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from '../AuthNavigation/AuthNavigation.types'
import styles from './ForgotPassword.styles'
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.ForgotPassword>
}

const ForgotPassword = ({ navigation }: Props) => {
  const [emailSent, setEmailSent] = useState(false)
  const { t } = useTranslation()

  return (
    <ViewContainer
      backgroundColor={Colors.SecondaryPurple}
      statusBarStyle={StatusBarStyle.LightContent}
      style={styles.container}
    >
      <ScrollView>
        <HeaderLarge
          navigation={navigation}
          backgroundColor={Colors.SecondaryPurple}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        <Optional
          condition={emailSent}
          fallback={
            <Card style={styles.card}>
              <Text.Header level={HeaderLevels.H3} align={TextAlign.Center} style={styles.cardHeaderText}>
                {t('forgotYourPassword')}?
              </Text.Header>
              <Text.Body color={Colors.PrimaryDarkGrey} style={styles.bodyText}>
                {t('forgotPasswordText')}
              </Text.Body>
              <ForgotPasswordForm setSubmitted={() => setEmailSent(true)} />
            </Card>
          }
        >
          <Card style={styles.card}>
            <Text.Header level={HeaderLevels.H3} align={TextAlign.Center} style={styles.cardHeaderText}>
              {t('checkEmail')}
            </Text.Header>
            <View style={styles.logoContainer}>
              <Message />
            </View>
            <Text.Body color={Colors.PrimaryDarkGrey} style={styles.bodyText}>
              {t('passwordSentText')}
            </Text.Body>
            <Button label={t('openEmail')} onPress={openInbox} />
            <Text.Header
              onPress={() => navigation.navigate(AuthNavigationRoutes.Login)}
              level={HeaderLevels.H5}
              color={Colors.PrimaryGreen}
              align={TextAlign.Center}
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
