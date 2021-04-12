import { YellowCircleRight, Message } from 'assets/Images'
import { ViewContainer, LargeHeaderContainer, ButtonContainer } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { openInbox } from 'react-native-email-link'
import { colors, Colors, TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

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
            <Text style={TextStyles.cardHeaderText}>{t('forgotYourPassword')} ?</Text>
            <Text style={[TextStyles.h4, TextStyles.textTertiary5, styles.bodyText]}>{t('forgotPasswordText')}</Text>
            <ForgotPasswordForm setSubmitted={() => setEmailSent(true)} />
          </View>
        ) : (
          <View style={styles.whiteCard}>
            <Text style={TextStyles.cardHeaderText}>{t('checkEmail')}</Text>
            <View style={styles.logoContainer}>
              <Message />
            </View>
            <Text
              style={[
                TextStyles.h4,
                TextStyles.textTertiary5,
                { marginVertical: 15, textAlign: 'center', paddingHorizontal: 20 },
              ]}
            >
              {t('passwordSentText')}
            </Text>
            <ButtonContainer
              buttonText={t<string>('openEmail')}
              buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15, alignSelf: 'center' }]}
              buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
              onPress={() => openInbox()}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[TextStyles.buttonText, TextStyles.textTertiary3, { marginVertical: 5 }]}>
                {t('skipComplete')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ViewContainer>
  )
}

export default ForgotPassword
