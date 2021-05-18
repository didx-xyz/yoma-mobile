import { StackNavigationProp } from '@react-navigation/stack'
import { PurpleQuarter } from 'assets/images'
import { Card, LargeHeader, ViewContainer } from 'components'
import { AuthNavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import { AuthNavigatorParamsList } from 'modules/AppNavigation/Authentication/Authentication.types'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import Text, { Bold, HeaderLevels, TextAlign } from '../../components/Typography'
import styles from './ResetPassword.styles'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.ResetPassword>
  route: any
}

const ResetPassword = ({ navigation, route }: Props) => {
  const { t } = useTranslation()
  const {
    params: { Token, Id },
  } = route
  useEffect(() => {
    if (!Token || !Id) {
      navigation.navigate(AuthNavigationRoutes.Login)
    }
  }, [Token, Id])
  return (
    <ViewContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <LargeHeader
          navigation={navigation}
          backgroundColor={Colors.primaryYellow}
          circleImage={<PurpleQuarter />}
          circleImageStyle={styles.purpleSemiCircleContainer}
        />
        <Card style={styles.card}>
          <Text.Header level={HeaderLevels.h3} align={TextAlign.center} style={styles.cardHeader}>
            {t('createNewPassword')}
          </Text.Header>
          <Text.Body color={Colors.primaryDarkGrey} style={styles.bodyText}>
            {t('resetPasswordBody1')}
            <Bold>{t('resetPasswordBody2')}</Bold>
            {t('resetPasswordBody3')}
            <Bold>{t('resetPasswordBody4')}.</Bold>
          </Text.Body>
          <ResetPasswordForm id={Id} token={Token} navigation={navigation} />
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default ResetPassword
