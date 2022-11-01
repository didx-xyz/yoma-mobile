import React, { useMemo } from 'react'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'

import { Colors } from '../../styles'
import Card from '../Card'
import Text, { HeaderLevels } from '../Typography'
import styles from './BannerCard.styles'

interface Background {
  imageSrc?: number
  imageOffset?: { x: number; y: number }
  color?: Colors
}

interface Content {
  title: string
  titleColor?: Colors
  body: string
  bodyColor?: Colors
  offset?: { x: number; y: number }
}

interface Props {
  background?: Background
  content?: Content
  height?: number
}

const BannerCard = ({ background, content, height = 190 }: Props) => {
  const containerStyles = useMemo(
    () =>
      StyleSheet.flatten([styles.container, { background: background?.color || Colors.White, height } as ViewStyle]),
    [background?.color, height],
  )

  const backgroundStyles = useMemo(
    () =>
      StyleSheet.flatten([
        styles.backgroundImage,
        {
          height,
          left: background?.imageOffset?.x,
          top: background?.imageOffset?.y,
        },
      ]),
    [background?.imageOffset?.x, background?.imageOffset?.y, height],
  )

  const contentStyles = useMemo(
    () => StyleSheet.flatten([styles.content, { marginLeft: content?.offset?.x, marginTop: content?.offset?.y }]),
    [content?.offset?.x, content?.offset?.y],
  )

  return (
    <Card style={containerStyles} corners="bubble">
      <View style={backgroundStyles}>
        {!!background?.imageSrc && <Image source={background!.imageSrc as number} />}
      </View>
      <View style={contentStyles}>
        <Text.Header level={HeaderLevels.H4} color={content?.titleColor}>
          {content?.title}
        </Text.Header>
        <Text.Header level={HeaderLevels.H6} color={content?.bodyColor}>
          {content?.body}
        </Text.Header>
      </View>
    </Card>
  )
}

export default BannerCard
