import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from '~/assets/images'
import Background from '~/components/Background/Background'
import Button, { ButtonSizes } from '~/components/Button'
import Spacer from '~/components/Spacer'
import Text, { HeaderLevels, TextAlign } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import Sentry from '~/monitoring'
import { Colors } from '~/styles'

import styles from './Landing.styles'

interface Props {
  onLogin: () => void
}

const Landing = ({ onLogin }: Props) => {
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
            label="Native Crash"
            onPress={() => {
              Sentry.nativeCrash()
            }}
          />
          <Spacer height={20} />
          <Button
            label="JS Crash"
            onPress={() => {
              setTimeout(() => {
                throw new Error('My {3rd} Sentry error!')
              }, 2000)
            }}
          />
          <Spacer height={40} />
          <Button
            size={ButtonSizes.Default}
            label={t('Login')}
            onPress={onLogin}
            style={styles.registerButton}
            loadingLabel="Logging you in..."
            isLoadingEnabled
          />
        </View>
      </View>
    </ViewContainer>
  )
}

export default Landing
