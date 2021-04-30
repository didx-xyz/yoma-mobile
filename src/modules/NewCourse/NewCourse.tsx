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
  const [isSaved, setIsSaved] = useState(false)
  const [courses, setCourses] = useState([])

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
