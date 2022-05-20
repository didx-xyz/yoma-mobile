import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CvWidget from '~/components/CvWidget'
import Text, { TextAlign } from '~/components/Typography'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

interface Props {
  biography: string
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCv>
}
const AboutWidget = ({ biography, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvWidget
      title={t('About')}
      noDataMessage={t('Your biography is one of the first things recruiters look at. Write a great one!')}
      onAction={() => {
        navigation.navigate(HomeNavigationRoutes.About)
      }}
      isEditAction
    >
      <Text.Body align={TextAlign.Center}>{biography}</Text.Body>
    </CvWidget>
  )
}
export default AboutWidget
