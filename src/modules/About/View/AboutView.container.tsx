import React from 'react'
import { useSelector } from 'react-redux'

import { AboutNavigation } from '~/modules/About/types'

import selector from '../About.selector'
import AboutView from './AboutView'

interface Props {
  onEdit: () => void
  navigation: AboutNavigation
}

const AboutViewContainer = ({ navigation, onEdit }: Props) => {
  const { biography } = useSelector(selector)
  return <AboutView onEdit={onEdit} navigation={navigation} biography={biography} />
}
export default AboutViewContainer
