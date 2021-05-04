import { Card, NormalHeader, Optional, SkillCard, ViewContainer } from 'components'
import Text, { HeaderLevels } from 'components/Typography'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, View } from 'react-native'
import { Colors } from 'styles'

import { MOCK_SKILLS } from './Skills.constants'
import styles from './Skills.styles'
import SkillsForm from './SkillsForm/SkillsForm'

interface Props {
  navigation: any
}

const Skills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [skills, setSkills] = useState(MOCK_SKILLS)

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isSaved} fallback={t('Skills')}>
            {t('Add skill')}
          </Optional>
        }
        onSave={() => {}}
        onAdd={() => setIsSaved(true)}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={
          <Card style={styles.outerCard}>
            <FlatList
              data={skills}
              ListHeaderComponent={
                <View style={styles.cardHeader}>
                  <View style={styles.certificateCount}>
                    <Text.Header level={HeaderLevels.h6} color={Colors.primaryBlue}>
                      60
                    </Text.Header>
                  </View>
                  <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple}>
                    {t('Top skills')}
                  </Text.Header>
                </View>
              }
              renderItem={({ item }) => <SkillCard skill={item.skill} skillCount={item.count} onPress={() => {}} />}
              keyExtractor={item => item.skill}
            />
          </Card>
        }
      >
        <SkillsForm />
      </Optional>
    </ViewContainer>
  )
}

export default Skills
