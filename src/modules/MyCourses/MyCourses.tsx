import { StackNavigationProp } from '@react-navigation/stack'
import { Card, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './MyCourses.styles'
import NewCourseForm from './NewCourseForm/NewCourseForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.MyCourses>
}

const MyCourses = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [courses, setCourses] = useState([])

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

export default MyCourses
