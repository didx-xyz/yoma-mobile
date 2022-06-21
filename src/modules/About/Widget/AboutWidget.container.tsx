import React from 'react'
import { useSelector } from 'react-redux'

import { types as MyCvTypes } from '~/modules/MyCv'

import selector from '../About.selector'
import AboutWidget from './AboutWidget'

interface Props {
  navigation: MyCvTypes.MyCvNavigation
}

const AboutWidgetContainer = ({ navigation }: Props) => {
  const { biography } = useSelector(selector)
  return <AboutWidget biography={biography} navigation={navigation} />
}

export default AboutWidgetContainer
