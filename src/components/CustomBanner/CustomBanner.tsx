import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { Colors, colors } from '~/styles'

import styles from './CustomBanner.style'

const data = [
  {
    key: 'one',
    title: 'Tasks',
    text: 'Grow your skills to the next level while building a CV that will impress future employers',
    color: colors[Colors.PrimaryPurple],
    altColor: colors[Colors.LightPurple],
    btnColor: colors[Colors.PrimaryLightPurple],
  },
  {
    key: 'two',
    title: 'Learning',
    text: 'Increase your employability while earning our digital youth tokens “Zlto” and other rewards.',
    color: colors[Colors.Blue],
    altColor: colors[Colors.LightBlue],
    btnColor: colors[Colors.PrimaryLightBlue],
  },
  {
    key: 'three',
    title: 'Impact',
    text: 'Create impact with local solutions, gain skills and earn Yoma’s digital youth tokens “Zlto” and other rewards.',
    color: colors[Colors.PrimaryGreen],
    altColor: colors[Colors.LightGreen],
    btnColor: colors[Colors.PrimaryLightGreen],
  },
]

type Props = {
  isBannerShow: boolean
  setBannerShow: Function
}

const CustomBanner = ({ isBannerShow, setBannerShow }: Props) => {
  const [bannerData, setBannerData] = useState(data[0])

  const handleBanner = (title: string) => {
    data.forEach(element => {
      if (element.title === title) {
        setBannerData(element)
      }
    })
  }

  return (
    <View style={[styles.container1, { backgroundColor: bannerData.color }]}>
      <View style={styles.titleView}>
        <TouchableOpacity
          onPress={() => {
            handleBanner('Tasks')
            setBannerShow(true)
          }}
          style={[
            styles.titleContainer,
            { backgroundColor: bannerData?.title === 'Tasks' ? bannerData.btnColor : bannerData.color },
          ]}
        >
          <Text style={[styles.title, { color: bannerData?.title === 'Tasks' ? colors.white : bannerData?.altColor }]}>
            Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleBanner('Learning')
            setBannerShow(true)
          }}
          style={[
            styles.titleContainer,
            { backgroundColor: bannerData?.title === 'Learning' ? bannerData.btnColor : bannerData.color },
          ]}
        >
          <Text
            style={[styles.title, { color: bannerData?.title === 'Learning' ? colors.white : bannerData?.altColor }]}
          >
            Learning
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleBanner('Impact')
            setBannerShow(true)
          }}
          style={[
            styles.titleContainer,
            { backgroundColor: bannerData?.title === 'Impact' ? bannerData.btnColor : bannerData.color },
          ]}
        >
          <Text style={[styles.title, { color: bannerData?.title === 'Impact' ? colors.white : bannerData?.altColor }]}>
            Impact
          </Text>
        </TouchableOpacity>
      </View>
      {isBannerShow && bannerData && (
        <View style={styles.textView}>
          <Text style={styles.text}>{bannerData.text}</Text>
        </View>
      )}
    </View>
  )
}

export default CustomBanner
