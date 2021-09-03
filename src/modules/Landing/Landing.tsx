import { StackNavigationProp } from '@react-navigation/stack'
import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from 'assets/images'
import { ViewContainer } from 'components'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from 'modules/AuthNavigation/AuthNavigation.types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import Background from '../../components/Background/Background'
import Button, { ButtonSizes, ButtonVariants } from '../../components/Button'
import Text, { HeaderLevels, TextAlign } from '../../components/Typography'
import styles from './Landing.styles'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Landing>
}

const Landing = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer>
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
          <Text.Header level={HeaderLevels.h1} align={TextAlign.Center}>
            {t('unlock')}
          </Text.Header>
          <Text.Header level={HeaderLevels.h1} align={TextAlign.Center} color={Colors.White}>
            {t('yourFuture')}
          </Text.Header>
          <Text.Header level={HeaderLevels.h4} color={Colors.White} align={TextAlign.Center} style={styles.bodyText}>
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
            onPress={() => navigation.navigate(AuthNavigationRoutes.Login)}
            style={styles.loginButton}
          />
        </View>
      </View>
    </ViewContainer>
  )
}

export default Landing
