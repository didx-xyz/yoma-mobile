import { PurpleQuarter } from 'assets/images'
import { LargeHeaderContainer, ViewContainer } from 'components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View, ScrollView } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'

import styles from './ResetPassword.styles'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

interface Props {
  navigation: any
  route: any
}

const ResetPassword = ({ navigation, route }: Props) => {
  const { t } = useTranslation()
  const {
    params: { Token, Id },
  } = route
  useEffect(() => {
    if (!Token || !Id) {
      navigation.navigate('Login')
    }
  }, [Token, Id])
  return (
    <ViewContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <LargeHeaderContainer
          navigation={navigation}
          headerText=""
          backgroundColor={colors[Colors.secondary]}
          circleImage={<PurpleQuarter />}
          circleImageStyle={styles.purpleSemiCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text style={TextStyles.cardHeaderText}>{t('createNewPassword')}</Text>
          <Text style={[TextStyles.h4, TextStyles.textTertiary5, styles.bodyText]}>
            {t('resetPasswordBody1')}
            <Text style={{ fontWeight: 'bold' }}>{t('resetPasswordBody2')}</Text>
            {t('resetPasswordBody3')}
            <Text style={{ fontWeight: 'bold' }}>{t('resetPasswordBody4')}</Text>
          </Text>
          <ResetPasswordForm id={Id} token={Token} navigation={navigation} />
        </View>
      </ScrollView>
    </ViewContainer>
  )
}

export default ResetPassword
