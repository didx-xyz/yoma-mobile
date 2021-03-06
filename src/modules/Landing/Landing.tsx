import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { PurpleSemiCircle, RedSemiCircle, WhiteLogo } from '~/assets/images'
import Background from '~/components/Background/Background'
import Button, { ButtonSizes } from '~/components/Button'
import Text, { HeaderLevels, TextAlign } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
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
            size={ButtonSizes.Default}
            label={t('Access Yoma')}
            onPress={onLogin}
            style={styles.registerButton}
            loadingLabel={t('Logging you in...')}
            isLoadingEnabled
          />
        </View>
      </View>
    </ViewContainer>
  )
}

export default Landing
