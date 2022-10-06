import React from 'react'
import { Dimensions, Text, View } from 'react-native'
//import AppIntroSlider from 'react-native-app-intro-slider'
import Carousel from 'react-native-banner-carousel'

import { Colors, colors } from '../../styles'
import styles from './Banner.styles'

const BannerWidth = Dimensions.get('window').width

const data = [
  {
    key: 'one',
    title: 'Tasks',
    text: 'Grow your skills to the next level while building a CV that will impress future employers',
    color: colors[Colors.PrimaryPurple],
  },
  {
    key: 'two',
    title: 'Learning',
    text: 'Increase your employability while earning our digital youth tokens “Zlto” and other rewards.',
    color: colors[Colors.Blue],
  },
  {
    key: 'three',
    title: ' Impact',
    text: 'Create impact with local solutions, gain skills and earn Yoma’s digital youth tokens “Zlto” and other rewards.',
    color: colors[Colors.PrimaryGreen],
  },
]

export default class Banner extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  renderPage(data: { key: string; title: string; text: string; color: string }, index: React.Key | null | undefined) {
    return (
      <View key={index} style={[styles.container1, { backgroundColor: data.color }]}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>{data.text}</Text>
        </View>
      </View>
    )
  }
  render() {
    return (
      <Carousel loop index={0} pageSize={BannerWidth} pageIndicatorStyle={{ backgroundColor: colors[Colors.White] }}>
        {data.map((item, index) => this.renderPage(item, index))}
      </Carousel>
    )
  }
}
