import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from 'assets/images'
import { ViewContainer } from 'components'
import { NavigationRoutes } from 'modules/AppNavigation/Authentication/Authentication.routes'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import Button, { ButtonSizes, ButtonVariants } from '../../../../components/Button'
import Text, { HeaderLevels, TextAlign } from '../../../../components/Typography'
import styles from './Landing.styles'

interface Props {
  navigation: any
}

const Landing = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <View style={styles.background}>
        <RedSemiCircle style={styles.redSemiCircle} />
        <View style={styles.purpleSemiCircleContainer}>
          <PurpleSemiCircle />
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.logoContainer}>
          <WhiteLogo />
        </View>
        <View style={styles.content}>
          <Text.Header level={HeaderLevels.h1} align={TextAlign.center}>
            {t('unlock')}
          </Text.Header>
          <Text.Header level={HeaderLevels.h1} align={TextAlign.center} color={Colors.white}>
            {t('yourFuture')}
          </Text.Header>
          <Text.Header level={HeaderLevels.h4} color={Colors.white} align={TextAlign.center} style={styles.bodyText}>
            {t('landingBodyText')}
          </Text.Header>
        </View>
        <View style={styles.actionsContainer}>
          <Button
            size={ButtonSizes.Default}
            label={t('register')}
            onPress={() => navigation.navigate(NavigationRoutes.Register)}
            style={styles.registerButton}
          />
          <Button
            variant={ButtonVariants.Clear}
            labelColor={Colors.white}
            label={t('login')}
            onPress={() => navigation.navigate(NavigationRoutes.Login)}
            style={styles.loginButton}
          />
        </View>
      </View>
    </ViewContainer>
  )
}

export default Landing
