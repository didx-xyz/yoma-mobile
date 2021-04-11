import { YellowCircleRight } from 'assets/Images'
import { LargeHeaderContainer, ViewContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'

import Text, { FontWeights, HeaderLevels, TextAlign } from '../../../../components/Typography'
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
          <Text.Header
            level={HeaderLevels.h3}
            align={TextAlign.center}
            weight={FontWeights.bold_700}
            style={[styles.cardHeader]}
          >
            {t('register')}
          </Text.Header>
          <RegisterForm />
        </View>
        <Text.Header level={HeaderLevels.h5} color={Colors.primaryDarkGrey} style={styles.notice}>
          {t('alreadyHaveAccount')}
          <Text.Body
            style={[TextStyles.buttonText, TextStyles.textTertiary3, { textAlign: 'center' }]}
            onPress={() => navigation.navigate('Login')}
          >
            &nbsp;
            {t('login')}.
          </Text.Body>
        </Text.Header>
      </ScrollView>
    </ViewContainer>
  )
}

export default RegisterWithEmail
