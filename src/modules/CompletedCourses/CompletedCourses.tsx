import { StackNavigationProp } from '@react-navigation/stack'
import { Card, EmptyCard, NormalHeader, Optional, ViewContainer } from 'components'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import CredentialCard from '../../components/CredentialCard'
import { MOCK_COURSES } from './CompletedCourses.constants'
import styles from './CompletedCourses.styles'
import NewCourseForm from './Form/NewCourseForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedCourses>
}
const CompletedCourses = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isEditing} fallback={t('Courses')}>
            {t('Add course')}
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
            condition={MOCK_COURSES.length > 0}
            fallback={<EmptyCard title={t('Have you completed any courses yet?')} onAdd={() => setIsEditing(true)} />}
          >
            <FlatList
              data={MOCK_COURSES}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => <CredentialCard {...item} onEdit={() => console.log('edit me')} />}
            />
          </Optional>
        }
      >
        <ScrollView>
          <Card>
            <NewCourseForm />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default CompletedCourses
