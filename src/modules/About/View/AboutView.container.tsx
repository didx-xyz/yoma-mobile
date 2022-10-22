import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { AboutNavigation } from '~/modules/About/types'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'

import selector from '../About.selector'
import AboutView from './AboutView'

interface Props {
  navigation: AboutNavigation
}

const AboutViewContainer = ({ navigation }: Props) => {
  const { biography } = useSelector(selector)
  const onEdit = useCallback(() => {
    navigation.navigate(HomeNavigationRoutes.AboutForm)
  }, [navigation])
  return <AboutView onEdit={onEdit} navigation={navigation} biography={biography} />
}
export default AboutViewContainer
