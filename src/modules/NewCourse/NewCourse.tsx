import { Card, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './NewCourse.styles'
import NewCourseForm from './NewCourseForm/NewCourseForm'

interface Props {
  navigation: any
}

const NewCourse = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [courses, setCourses] = useState([])

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isAddingCourse} fallback={t('Courses')}>
            {t('Add course')}
          </Optional>
        }
        onSave={() => {}}
        onAdd={() => setIsAddingCourse(true)}
        showAddButton={!isAddingCourse}
      />
      <Optional
        condition={isAddingCourse}
        fallback={<FlatList data={courses} renderItem={({ item }) => <Text.Body>render</Text.Body>} />}
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
