import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, NormalHeader, Optional, SkillCard, ViewContainer } from 'components'
import ListCardHeader from 'components/ListCardHeader'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Colors } from 'styles'

import { MOCK_SKILLS } from './UserSkills.constants'
import styles from './UserSkills.styles'
import SkillsForm from './UserSkillsForm/UserSkillsForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Skills>
}

const Skills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isEditing} fallback={t('Skills')}>
            {t('Add skill')}
          </Optional>
        }
        onSave={() => {}}
        onAdd={() => setIsEditing(true)}
        showAddButton={!isEditing}
      />
      <Optional
        condition={isEditing}
        fallback={
          <Optional
            condition={MOCK_SKILLS.length > 0}
            fallback={<EmptyCard title={t('Tell us what you are great at.')} onAdd={() => setIsEditing(true)} />}
          >
            <Card style={styles.outerCard}>
              <FlatList
                data={MOCK_SKILLS}
                ListHeaderComponent={<ListCardHeader color={Colors.primaryBlue} count={60} header={t('Top skills')} />}
                renderItem={({ item }) => <SkillCard skill={item.skill} skillCount={item.count} onPress={() => {}} />}
                keyExtractor={item => item.skill}
              />
            </Card>
          </Optional>
        }
      >
        <Card>
          <SkillsForm />
        </Card>
      </Optional>
    </ViewContainer>
  )
}

export default Skills