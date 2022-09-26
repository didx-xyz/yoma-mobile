import { useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

import { HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

import Header from '../Header'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
}

const MyWeb = ({ navigation }: Props) => {
  const route = useRoute()
  console.log(route.params)
  const data: any = route?.params
  return (
    <>
      <Header navigation={navigation} headerText="Webview" actionItem={<View />} />
      <WebView source={{ uri: data.url }} />
    </>
  )
}

export default MyWeb
