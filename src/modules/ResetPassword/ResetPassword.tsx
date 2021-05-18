import { PurpleQuarter } from 'assets/images'
import { Card, LargeHeaderContainer, ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors, colors } from 'styles'

import Text, { Bold, HeaderLevels, TextAlign } from '../../components/Typography'
import styles from './ResetPassword.styles'
import { ResetPasswordRoute } from './ResetPassword.types'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

interface Props {
  navigation: any
  route: ResetPasswordRoute
}

const ResetPassword = ({ navigation, route }: Props) => {
  const { t } = useTranslation()
  const {
    params: { Token, Id },
  } = route
  useEffect(() => {
    if (!Token || !Id) {
      navigation.navigate(NavigationRoutes.Login)
    }
  }, [Token, Id, navigation])
  return (
    <ViewContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <LargeHeaderContainer
          navigation={navigation}
          headerText=""
          backgroundColor={colors[Colors.primaryYellow]}
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
