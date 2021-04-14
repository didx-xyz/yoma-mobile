import { Message, YellowCircleRight } from 'assets/images'
import { ButtonContainer, LargeHeaderContainer, ViewContainer } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { openInbox } from 'react-native-email-link'
import { colors, Colors, TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

import Text, { HeaderLevels, TextAlign } from '../../../../components/Typography'
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <LargeHeaderContainer
          navigation={navigation}
          headerText={t('forgotPassword')}
          backgroundColor={colors[Colors.secondaryPurple]}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowSemiCircleContainer}
        />
        {!emailSent ? (
          <View style={styles.whiteCard}>
            <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeaderText}>
              {t('forgotYourPassword')} ?
            </Text.Header>
            <Text.Header
              level={HeaderLevels.h4}
              color={Colors.primaryDarkGrey}
              align={TextAlign.center}
              style={styles.bodyText}
            >
              {t('forgotPasswordText')}
            </Text.Header>
            <ForgotPasswordForm setSubmitted={() => setEmailSent(true)} />
          </View>
        ) : (
          <View style={styles.whiteCard}>
            <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeaderText}>
              {t('checkEmail')}
            </Text.Header>
            <View style={styles.logoContainer}>
              <Message />
            </View>
            <Text.Header
              level={HeaderLevels.h4}
              color={Colors.primaryDarkGrey}
              align={TextAlign.center}
              style={styles.bodyText}
            >
              {t('passwordSentText')}
            </Text.Header>
            <ButtonContainer
              buttonText={t<string>('openEmail')}
              buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
              buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
              onPress={() => openInbox()}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text.Header level={HeaderLevels.h5} color={Colors.primaryGreen} style={{ marginVertical: 5 }}>
                {t('skipComplete')}
              </Text.Header>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ViewContainer>
  )
}

export default ForgotPassword
