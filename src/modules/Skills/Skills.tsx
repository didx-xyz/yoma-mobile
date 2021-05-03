import { NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import styles from './Skills.styles'
import SkillsForm from './SkillsForm/SkillsForm'

interface Props {
  navigation: any
}

const Skills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState([])

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Skills')}
        onSave={() => {}}
        onAdd={() => setIsEditing(true)}
        showAddButton={!isEditing}
      />
      <Optional
        condition={isEditing}
        fallback={<FlatList data={skills} renderItem={() => <Text.Body>render</Text.Body>} />}
      >
        <SkillsForm />
      </Optional>
    </ViewContainer>
  )
}

export default Skills
