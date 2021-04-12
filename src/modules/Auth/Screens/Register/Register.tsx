import { PurpleQuarter } from 'assets/Images'
import { ButtonContainer, LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

import styles from './Register.styles'

interface Props {
  navigation: any
}

const Register = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <LargeHeaderContainer
        navigation={navigation}
        headerText={t<string>('register')}
        backgroundColor={colors[Colors.primaryYellow]}
        circleImage={<PurpleQuarter />}
        circleImageStyle={styles.purpleSemiCircleContainer}
      />
      <View style={styles.whiteCard}>
        <Text style={TextStyles.cardHeaderText}>{t('welcome')}</Text>
        <ButtonContainer
          buttonText={t<string>('registerWithEmail')}
          buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15 }]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('RegisterWithEmail')}
        />
        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
          <Text style={[TextStyles.h3, TextStyles.textTertiary5, { paddingHorizontal: 15 }]}>{t('or')}</Text>
          <View style={styles.horizontalLine} />
        </View>
        <Text style={[TextStyles.h5, TextStyles.textTertiary5, { marginTop: 15 }]}>{t('registerSocial')}</Text>
        <SocialRegistration />
      </View>
      <Text style={[TextStyles.h5, TextStyles.textTertiary5, { textAlign: 'center', marginTop: 30 }]}>
        {t('alreadyHaveAccount')}
        <Text
          style={[TextStyles.buttonText, TextStyles.textTertiary3, { textAlign: 'center' }]}
          onPress={() => navigation.navigate('Login')}
        >
          &nbsp;
          {t('login')}.
        </Text>
      </Text>
    </ViewContainer>
  )
}

export default Register
