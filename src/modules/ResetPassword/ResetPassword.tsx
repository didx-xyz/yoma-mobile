import { StackNavigationProp } from '@react-navigation/stack'
import { PurpleQuarter } from 'assets/images'
import { Card, LargeHeader, ViewContainer } from 'components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import Text, { Bold, HeaderLevels, TextAlign } from '../../components/Typography'
import { types as AuthNavigationTypes } from '../AuthNavigation'
import styles from './ResetPassword.styles'
import { ResetPasswordRoute } from './ResetPassword.types'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

interface Props {
  navigation: StackNavigationProp<
    AuthNavigationTypes.AuthNavigationParamsList,
    AuthNavigationTypes.AuthNavigationRoutes.ResetPassword
  >
  route: ResetPasswordRoute
}

const ResetPassword = ({ navigation, route }: Props) => {
  const { t } = useTranslation()
  const {
    params: { Token, Id },
  } = route
  useEffect(() => {
    if (!Token || !Id) {
      navigation.navigate(AuthNavigationTypes.AuthNavigationRoutes.Login)
    }
  }, [Token, Id, navigation])
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
          <ResetPasswordForm />
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default ResetPassword
