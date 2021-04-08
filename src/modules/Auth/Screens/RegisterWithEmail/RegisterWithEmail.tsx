import { YellowCircleRight } from 'assets/Images'
import { LargeHeaderContainer, ViewContainer } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, ScrollView, View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'

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
          backgroundColor={colors[Colors.tertiary6]}
          circleImage={<YellowCircleRight />}
          circleImageStyle={styles.yellowCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text style={[TextStyles.cardHeaderText, { alignSelf: 'center' }]}>{t('register')}</Text>
          <RegisterForm />
        </View>
        <Text style={[TextStyles.h5, TextStyles.textTertiary5, { textAlign: 'center', marginVertical: 30 }]}>
          {t('alreadyHaveAccount')}
          <Text
            style={[TextStyles.buttonText, TextStyles.textTertiary3, { textAlign: 'center' }]}
            onPress={() => navigation.navigate('Login')}
          >
            &nbsp;
            {t('login')}.
          </Text>
        </Text>
      </ScrollView>
    </ViewContainer>
  )
}

export default RegisterWithEmail
