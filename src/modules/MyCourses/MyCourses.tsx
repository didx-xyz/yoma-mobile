import { StackNavigationProp } from '@react-navigation/stack'
import { EmptyCard, Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from 'modules/HomeNavigation/HomeNavigation.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCK_COURSES } from './MyCourses.constants'
import styles from './MyCourses.styles'
import { CourseEntry } from './MyCourses.types'
import NewCourseForm from './NewCourseForm/NewCourseForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCourses>
}

const renderCourseEntry = ({ course, description, startDate, endDate, organisationLogoUrl }: CourseEntry) => {
  return (
    <InfoCard
      title={course}
      description={description}
      startDate={startDate}
      endDate={endDate}
      logo={organisationLogoUrl}
    />
  )
}

const MyCourses = ({ navigation }: Props) => {
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
              renderItem={({ item }) => renderCourseEntry(item)}
              keyExtractor={item => item.course}
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

export default MyCourses
