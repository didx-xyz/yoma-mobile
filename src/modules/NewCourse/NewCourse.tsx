import { Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './NewCourse.styles'
import { CourseValue } from './NewCourse.types'
import NewCourseForm from './NewCourseForm/NewCourseForm'

interface Props {
  navigation: any
}

const NewCourse = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  // TODO: adding static data for UI handling
  const [courses, setCourses] = useState([
    {
      course: 'Beyond your future challenge',
      organisationLogoURL: '',
      courseHostProvider: '',
      endDate: '04/01/2020',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
  ])

  const renderItem = ({ course, description, endDate, organisationLogoURL }: CourseValue) => {
    return <InfoCard title={course} description={description} endDate={endDate} logo={organisationLogoURL} />
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Courses')}
        onSave={() => {}}
        onAdd={() => {
          setIsSaved(true)
        }}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={
          <FlatList data={courses} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.course} />
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
