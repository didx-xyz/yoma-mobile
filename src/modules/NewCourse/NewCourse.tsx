import { Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCK_COURSES } from './NewCourse.constants'
import styles from './NewCourse.styles'
import { CourseEntry } from './NewCourse.types'
import NewCourseForm from './NewCourseForm/NewCourseForm'

interface Props {
  navigation: any
}

const renderCourseEntry = ({ course, description, endDate, organisationLogoURL }: CourseEntry) => {
  return <InfoCard title={course} description={description} endDate={endDate} logo={organisationLogoURL} />
}

const NewCourse = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [courses, setCourses] = useState(MOCK_COURSES)

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isSaved} fallback={t('Courses')}>
            {t('Add course')}
          </Optional>
        }
        onSave={() => {}}
        onAdd={() => setIsSaved(true)}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={
          <FlatList
            data={courses}
            renderItem={({ item }) => renderCourseEntry(item)}
            keyExtractor={item => item.course}
          />
        }
      >
        <ScrollView>
          <Card>
            <NewCourseForm navigation={navigation} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default NewCourse
