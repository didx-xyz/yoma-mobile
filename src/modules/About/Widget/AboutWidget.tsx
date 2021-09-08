import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget from '../../../components/CvWidget'
import Text, { TextAlign } from '../../../components/Typography'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'

interface Props {
  biography: string
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const AboutWidget = ({ biography, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      title={t('About')}
      fallback={t('Your biography is one of the first things recruiters look at. Write a great one!')}
      onEdit={() => {
        navigation.navigate(HomeNavigationRoutes.About)
      }}
    >
      <Text.Body align={TextAlign.Center}>{biography}</Text.Body>
    </CvWidget>
  )
}
export default AboutWidget
