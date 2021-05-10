import { Card, ListCard, NormalHeader, Optional, SkillCard, ViewContainer } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Colors } from 'styles'

import { MOCK_SKILLS } from './Skills.constants'
import styles from './Skills.styles'
import SkillsForm from './SkillsForm/SkillsForm'

interface Props {
  navigation: any
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
              ListHeaderComponent={<ListCard color={Colors.primaryBlue} value={60} label={t('Top skills')} />}
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
