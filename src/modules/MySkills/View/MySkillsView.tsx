import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import CountBadge from '~/components/CountBadge'
import CountrySelector from '~/components/CountrySelector'
import CvView, { CvViewList } from '~/components/CvView'
import CvViewSkill, { types as CvViewSkillTypes } from '~/components/CvViewSkill'
import Text, { HeaderLevels } from '~/components/Typography'
import { MySkillsNavigation } from '~/modules/MySkills/types'
import { Colors } from '~/styles'

import styles from './MySkillsView.styles'

interface Props {
  onAdd: () => void
  count: number
  userSkills: CvViewSkillTypes.NormalisedCvWidgetSkillItems
  navigation: MySkillsNavigation
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
        <CountrySelector searchPlaceholder={'Select the country'} />
        {/*<CvViewList*/}
        {/*  data={userSkills}*/}
        {/*  ListHeader={*/}
        {/*    <View style={styles.listHeader}>*/}
        {/*      <CountBadge count={count} color={Colors.PrimaryBlue} />*/}
        {/*      <Text.Header level={HeaderLevels.H5} color={Colors.PrimaryPurple} style={styles.listHeaderText}>*/}
        {/*        {t('All Skills')}*/}
        {/*      </Text.Header>*/}
        {/*    </View>*/}
        {/*  }*/}
        {/*  RenderItem={CvViewSkill}*/}
        {/*/>*/}
      </View>
    </CvView>
  )
}

export default MySkillsView
