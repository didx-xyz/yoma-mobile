import { PurpleQuarter } from 'assets/images'
import { LargeHeaderContainer, ViewContainer } from 'components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { Colors, colors } from 'styles'

import Text, { Bold, FontWeights, HeaderLevels, TextAlign } from '../../../../components/Typography'
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
    <ViewContainer>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        <LargeHeaderContainer
          navigation={navigation}
          headerText=""
          backgroundColor={colors[Colors.primaryYellow]}
          circleImage={<PurpleQuarter />}
          circleImageStyle={styles.purpleSemiCircleContainer}
        />
        <View style={styles.whiteCard}>
          <Text.Header
            level={HeaderLevels.h3}
            align={TextAlign.center}
            weight={FontWeights.bold_700}
            style={styles.cardHeader}
          >
            {t('createNewPassword')}
          </Text.Header>
          <Text.Header
            level={HeaderLevels.h4}
            color={Colors.primaryDarkGrey}
            align={TextAlign.center}
            style={styles.bodyText}
          >
            {t('resetPasswordBody1')}
            <Bold>{t('resetPasswordBody2')}</Bold>
            {t('resetPasswordBody3')}
            <Bold>{t('resetPasswordBody4')}</Bold>
          </Text.Header>
          <ResetPasswordForm id={Id} token={Token} navigation={navigation} />
        </View>
      </ScrollView>
    </ViewContainer>
  )
}

export default ResetPassword
