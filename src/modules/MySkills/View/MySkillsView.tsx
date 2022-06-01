import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import CountBadge from '~/components/CountBadge'
import CountryPicker from '~/components/CountryPicker'
import CvView, { CvViewList } from '~/components/CvView'
import CvViewSkill, { types as CvViewSkillTypes } from '~/components/CvViewSkill'
import Text, { HeaderLevels } from '~/components/Typography'
import { types as HomNavigationTypes } from '~/modules/HomeNavigation'
import { Colors } from '~/styles'

import styles from './MySkillsView.styles'

interface Props {
  onAdd: () => void
  count: number
  userSkills: CvViewSkillTypes.NormalisedCvWidgetSkillItems
  navigation: NativeStackNavigationProp<
    HomNavigationTypes.HomeNavigatorParamsList,
    HomNavigationTypes.HomeNavigationRoutes.MySkills
  >
}

const MySkillsView = ({ userSkills, count, onAdd, navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Skills')}
      noDataMessage={t('Tell us what you are great at.')}
      onAction={onAdd}
      navigation={navigation}
    >
      <View style={styles.container}>
        <CountryPicker />
        <CvViewList
          data={userSkills}
          ListHeader={
            <View style={styles.listHeader}>
              <CountBadge count={count} color={Colors.PrimaryBlue} />
              <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple} style={styles.listHeaderText}>
                All Skills
              </Text.Header>
            </View>
          }
          RenderItem={CvViewSkill}
        />
      </View>
    </CvView>
  )
}

export default MySkillsView
