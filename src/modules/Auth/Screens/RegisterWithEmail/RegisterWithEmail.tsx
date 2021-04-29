import { YellowCircleRight } from 'assets/images'
import { LargeHeaderContainer, ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { Colors, colors } from 'styles'

import Text, { BodyLevels, HeaderLevels, TextAlign } from '../../../../components/Typography'
import RegisterForm from './RegisterForm/RegisterForm'
import styles from './RegisterWithEmail.styles'

interface Props {
  navigation: any
}

const RegisterWithEmail = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <ScrollView>
        <LargeHeaderContainer
          navigation={navigation}
          headerText={t<string>('register')}
          backgroundColor={colors[Colors.secondaryPurple]}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text.Header level={HeaderLevels.h3} align={TextAlign.center}>
            {t('register')}
          </Text.Header>
          <RegisterForm />
        </View>
        <Text.Body level={BodyLevels.small} align={TextAlign.center} style={styles.notice}>
          {t('alreadyHaveAccount')}
          <Text.Body color={Colors.primaryGreen} onPress={() => navigation.navigate(NavigationRoutes.Login)}>
            &nbsp;
            {t('login')}.
          </Text.Body>
        </Text.Body>
      </ScrollView>
    </ViewContainer>
  )
}

export default RegisterWithEmail
