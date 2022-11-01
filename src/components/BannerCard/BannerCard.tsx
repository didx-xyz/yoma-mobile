import React, { useMemo } from 'react'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'

import Card from '~/components/Card'
import Text, { HeaderLevels } from '~/components/Typography'
import { Colors } from '~/styles'

import styles from './BannerCard.styles'

interface Offset {
  x: number
  y: number
}

interface Background {
  imageSrc?: number
  imageOffset?: Offset
  color?: Colors
}

interface Content {
  title: string
  titleColor?: Colors
  body: string
  bodyColor?: Colors
  offset?: Offset
}

interface Props {
  content: Content
  background?: Background
  height?: number
}

const OFFSET_FALLBACK = 0
const safeOffset = (offset?: Offset) => (value: 'x' | 'y') => offset?.[value] || OFFSET_FALLBACK

const BannerCard = ({ background, content, height = 190 }: Props) => {
  const containerStyles = useMemo(
    () =>
      StyleSheet.flatten([styles.container, { background: background?.color || Colors.White, height } as ViewStyle]),
    [background?.color, height],
  )

  const backgroundStyles = useMemo(() => {
    const safeImageOffset = safeOffset(background?.imageOffset)
    return StyleSheet.flatten([
      styles.backgroundImage,
      {
        height,
        left: safeImageOffset('x'),
        top: safeImageOffset('y'),
      },
    ])
  }, [background?.imageOffset, height])

  const contentStyles = useMemo(() => {
    const safeContentOffset = safeOffset(content?.offset)
    return { marginLeft: safeContentOffset('x'), marginTop: safeContentOffset('y') }
  }, [content?.offset])

  return (
    <Card style={containerStyles} corners="bubble">
      <View style={backgroundStyles}>
        {!!background && !!background.imageSrc && <Image source={background.imageSrc} />}
      </View>
      <View style={contentStyles}>
        <Text.Header level={HeaderLevels.H4} color={content?.titleColor}>
          {content.title}
        </Text.Header>
        <Text.Header level={HeaderLevels.H6} color={content?.bodyColor}>
          {content.body}
        </Text.Header>
      </View>
    </Card>
  )
}

export default BannerCard
