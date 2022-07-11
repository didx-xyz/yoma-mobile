import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, View } from 'react-native'

import Button, { ButtonVariants } from '~/components/Button'
import CvWidget from '~/components/CvWidget'
import Divider from '~/components/Divider'
import Text from '~/components/Typography'
import { HomeNavigationRoutes } from '~/modules/HomeNavigation/HomeNavigation.types'
import { types as MyCvTypes } from '~/modules/MyCv'
import { trunc } from '~/utils/strings.utils'

import styles from './AboutWidget.styles'

interface Props {
  biography: string
  navigation: MyCvTypes.MyCvNavigation
}
const AboutWidget = ({ biography, navigation }: Props) => {
  const { t } = useTranslation()

  const biographyShort = useMemo(() => trunc(biography, 120), [biography])

  return (
    <CvWidget
      title={t('about.title')}
      noDataMessage={t('Your biography is one of the first things recruiters look at. Write a great one!')}
      onActionPress={() => {
        navigation.navigate(HomeNavigationRoutes.AboutForm)
      }}
      isEditAction
    >
      <View style={styles.container}>
        <Pressable
          style={styles.content}
          onPress={() => {
            navigation.navigate(HomeNavigationRoutes.About)
          }}
        >
          <Text.Body>{biographyShort}</Text.Body>
        </Pressable>
        <Divider />
        <Button
          label={t('View All')}
          variant={ButtonVariants.Clear}
          onPress={() => navigation.navigate(HomeNavigationRoutes.About)}
        />
      </View>
    </CvWidget>
  )
}
export default AboutWidget
