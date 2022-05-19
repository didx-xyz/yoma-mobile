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
  subject: string
  isSingularSubject?: boolean
  byLine: string
  heroBgColor: Colors
  BottomImg: typeof Svg
}
const ComingSoon = ({ subject, byLine, heroBgColor, BottomImg, isSingularSubject = false }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <View style={styles.bgContainer}>
        <CirclePurple style={styles.bgCircle} />
      </View>
      <View style={[styles.hero, { backgroundColor: colors[heroBgColor] }]}>
        <BottomImg style={styles.bottomCircle} />
        <View style={styles.header}>
          <Text.Header level={HeaderLevels.H2}>
            <Span color={Colors.White}>{subject} </Span>
            {isSingularSubject ? t('is') : t('are')}
          </Text.Header>
          <Text.Header level={HeaderLevels.H2}>{t('coming soon')}!</Text.Header>
        </View>
        <Text.Body color={Colors.White}>{byLine}</Text.Body>
      </View>
    </ViewContainer>
  )
}
export default ComingSoon
