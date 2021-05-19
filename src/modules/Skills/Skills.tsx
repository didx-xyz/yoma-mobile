import { StackNavigationProp } from '@react-navigation/stack'
import { Card, ListCardHeader, NormalHeader, Optional, SkillCard, ViewContainer } from 'components'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Colors } from 'styles'

import { MOCK_SKILLS } from './Skills.constants'
import styles from './Skills.styles'
import SkillsForm from './SkillsForm/SkillsForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Skills>
}

const Skills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState(MOCK_SKILLS)

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
          <Card style={styles.outerCard}>
            <FlatList
              data={skills}
              ListHeaderComponent={<ListCardHeader color={Colors.primaryBlue} count={60} header={t('Top skills')} />}
              renderItem={({ item }) => <SkillCard skill={item.skill} skillCount={item.count} onPress={() => {}} />}
              keyExtractor={item => item.skill}
            />
          </Card>
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
