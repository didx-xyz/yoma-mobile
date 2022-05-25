import React from 'react'

import { AboutNavigation } from '~/modules/About/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import AboutView from './View'

interface Props {
  navigation: AboutNavigation
}

const About = ({ navigation }: Props) => (
  <AboutView
    onEdit={() => {
      navigation.navigate(HomeNavigationRoutes.AboutForm)
    }}
    navigation={navigation}
  />
)

export default About
