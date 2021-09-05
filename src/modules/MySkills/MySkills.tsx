import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import Card from '../../components/Card'
import EmptyCard from '../../components/EmptyCard'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import SkillCard from '../../components/SkillCard'
import ViewContainer from '../../components/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import SkillsForm from './Form/MySkillsForm'
import { MOCK_SKILLS } from './MySkills.constants'
import styles from './MySkills.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
}

const MySkills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <Header
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

export default MySkills
