import { StackNavigationProp } from '@react-navigation/stack'
import { PurpleQuarter } from 'assets/images'
import { Card, ViewContainer } from 'components'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from 'modules/AuthNavigation/AuthNavigation.types'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import { Colors } from 'styles'

import HeaderLarge from '../../components/HeaderLarge'
import Text, { Bold, HeaderLevels, TextAlign } from '../../components/Typography'
import styles from './ResetPassword.styles'
import { ResetPasswordRoute } from './ResetPassword.types'
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.ResetPassword>
  route: ResetPasswordRoute
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
  }, [Token, Id, navigation])
  return (
    <ViewContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderLarge
          navigation={navigation}
          backgroundColor={Colors.PrimaryYellow}
          circleImage={<PurpleQuarter />}
          circleImageStyle={styles.purpleSemiCircleContainer}
        />
        <Card style={styles.card}>
          <Text.Header level={HeaderLevels.H3} align={TextAlign.Center} style={styles.cardHeader}>
            {t('createNewPassword')}
          </Text.Header>
          <Text.Body color={Colors.PrimaryDarkGrey} style={styles.bodyText}>
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
