import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Svg from 'react-native-svg/lib/typescript'

import { CirclePurple } from '~/assets/images'
import Text, { HeaderLevels, Span } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import { Colors, colors } from '~/styles'

import styles from './ComingSoon.styles'

interface Props {
  pageName: string
  description: string
  heroBgColor: Colors
  BottomCircle: typeof Svg
}
const ComingSoon = ({ pageName, description, heroBgColor, BottomCircle }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <View style={styles.bgContainer}>
        <CirclePurple style={styles.bgCircle} />
      </View>
      <View style={[styles.hero, { backgroundColor: colors[heroBgColor] }]}>
        <BottomCircle style={styles.bottomCircle} />
        <View style={styles.header}>
          <Text.Header level={HeaderLevels.H2}>
            <Span color={Colors.White}>{pageName} </Span>
            {t('are')}
          </Text.Header>
          <Text.Header level={HeaderLevels.H2}>{t('coming soon')}!</Text.Header>
        </View>
        <Text.Body color={Colors.White}>{description}</Text.Body>
      </View>
    </ViewContainer>
  )
}
export default ComingSoon
