import React, { useCallback, useMemo } from 'react'
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

  const biographyShort = useMemo(() => biography && trunc(biography, 120), [biography])
  const onFormNavigate = useCallback(() => {
    navigation.navigate(HomeNavigationRoutes.AboutForm)
  }, [navigation])
  const onViewAllNavigate = useCallback(() => navigation.navigate(HomeNavigationRoutes.About), [navigation])

  return (
    <CvWidget
      title={t('about.title')}
      hasContent={!!biography}
      noDataMessage={t('Your biography is one of the first things recruiters look at. Write a great one!')}
      onActionPress={onFormNavigate}
      isEditAction
    >
      <View style={styles.container}>
        <Pressable style={styles.content} onPress={onViewAllNavigate}>
          <Text.Body>{biographyShort}</Text.Body>
        </Pressable>
        <Divider />
        <Button label={t('View Full Biography')} variant={ButtonVariants.Clear} onPress={onViewAllNavigate} />
      </View>
    </CvWidget>
  )
}
export default AboutWidget
