import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { authorize as oAuthAuthorize } from 'react-native-app-auth'

import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from '~/assets/images'
import { ViewContainer } from '~/components'
import Background from '~/components/Background/Background'
import Button, { ButtonSizes, ButtonVariants } from '~/components/Button'
import Text, { HeaderLevels, TextAlign } from '~/components/Typography'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from '~/modules/AuthNavigation/AuthNavigation.types'
import { Colors } from '~/styles'

import styles from './Landing.styles'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Landing>
  onLogin: () => void
}

const Landing = ({ navigation, onLogin }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer backgroundColor={Colors.PrimaryYellow}>
      <Background>
        <RedSemiCircle style={styles.redSemiCircle} />
        <View style={styles.purpleSemiCircleContainer}>
          <PurpleSemiCircle />
        </View>
      </Background>
      <View style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <WhiteLogo />
        </View>
        <View style={styles.content}>
          <Text.Header level={HeaderLevels.H1} align={TextAlign.Center}>
            {t('unlock')}
          </Text.Header>
          <Text.Header level={HeaderLevels.H1} align={TextAlign.Center} color={Colors.White}>
            {t('yourFuture')}
          </Text.Header>
          <Text.Header level={HeaderLevels.H4} color={Colors.White} align={TextAlign.Center} style={styles.bodyText}>
            {t('landingBodyText')}
          </Text.Header>
        </View>
        <View style={styles.actionsContainer}>
          <Button
            size={ButtonSizes.Default}
            label={t('register')}
            onPress={() => navigation.navigate(AuthNavigationRoutes.Register)}
            style={styles.registerButton}
          />
          <Button
            variant={ButtonVariants.Clear}
            color={Colors.White}
            label={t('login')}
            onPress={onLogin}
            style={styles.loginButton}
          />
        </View>
      </View>
    </ViewContainer>
  )
}

export default Landing
