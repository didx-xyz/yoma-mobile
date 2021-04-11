import { PurpleQuarter } from 'assets/Images'
import { ButtonContainer, LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'
import ButtonStyles from 'styles/button.styles'

import Text, { FontWeights, HeaderLevels, TextAlign } from '../../../../components/Typography'
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
        <Text.Header
          level={HeaderLevels.h3}
          align={TextAlign.center}
          weight={FontWeights.bold_700}
          style={[styles.cardHeader]}
        >
          {t('welcome')}
        </Text.Header>
        <ButtonContainer
          buttonText={t<string>('registerWithEmail')}
          buttonStyle={[ButtonStyles.largeTertiary3Button, { marginVertical: 15 }]}
          buttonTextStyle={[TextStyles.textWhite, TextStyles.buttonText]}
          onPress={() => navigation.navigate('RegisterWithEmail')}
        />
        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
          <Text.Header level={HeaderLevels.h3} color={Colors.primaryDarkGrey} style={styles.orText}>
            {t('or')}
          </Text.Header>
          <View style={styles.horizontalLine} />
        </View>
        <Text.Header level={HeaderLevels.h5} color={Colors.primaryDarkGrey} style={{ marginTop: 15 }}>
          {t('registerSocial')}
        </Text.Header>
        <SocialRegistration />
      </View>
      <Text.Header
        level={HeaderLevels.h5}
        color={Colors.primaryDarkGrey}
        style={{ textAlign: 'center', marginTop: 30 }}
      >
        {t('alreadyHaveAccount')}
        <Text.Body
          style={[TextStyles.buttonText, TextStyles.textTertiary3, { textAlign: 'center' }]}
          onPress={() => navigation.navigate('Login')}
        >
          &nbsp;
          {t('login')}.
        </Text.Body>
      </Text.Header>
    </ViewContainer>
  )
}

export default Register
