import { PurpleQuarter } from 'assets/images'
import { ButtonContainer, LargeHeaderContainer, SocialRegistration, ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors, colors } from 'styles'
import ButtonStyles from 'styles/button.styles'

import Text, { BodyLevels, HeaderLevels, Span, TextAlign } from '../../components/Typography'
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
        <Text.Header level={HeaderLevels.h3} align={TextAlign.center}>
          {t('welcome')}
        </Text.Header>
        <ButtonContainer
          buttonText={t<string>('registerWithEmail')}
          buttonStyle={[ButtonStyles.largeTertiary3Button, styles.button]}
          onPress={() => navigation.navigate(NavigationRoutes.RegisterWithEmail)}
        />
        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
          <Text.Header level={HeaderLevels.h3} color={Colors.primaryDarkGrey} style={styles.orText}>
            {t('or')}
          </Text.Header>
          <View style={styles.horizontalLine} />
        </View>
        <Text.Body level={BodyLevels.small} style={styles.bodyText}>
          {t('registerSocial')}
        </Text.Body>
        <SocialRegistration />
      </View>
      <Text.Body
        level={BodyLevels.small}
        color={Colors.primaryDarkGrey}
        align={TextAlign.center}
        style={styles.bottomText}
      >
        {t('alreadyHaveAccount')}
        <Span color={Colors.primaryGreen} onPress={() => navigation.navigate(NavigationRoutes.Login)}>
          &nbsp;
          {t('login')}.
        </Span>
      </Text.Body>
    </ViewContainer>
  )
}

export default Register
