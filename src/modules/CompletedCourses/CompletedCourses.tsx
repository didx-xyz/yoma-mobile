import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { ButtonAdd, ButtonSave } from '../../components/Button'
import Card from '../../components/Card'
import CvViewCredential from '../../components/CvViewCredential'
import EmptyCard from '../../components/EmptyCard'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import ViewContainer from '../../components/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
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
      <Header
        navigation={navigation}
        headerText={
          <Optional condition={isEditing} fallback={t('Courses')}>
            {t('Add course')}
          </Optional>
        }
        actionItem={
          isEditing ? (
            <ButtonSave onPress={() => {}} />
          ) : (
            <ButtonAdd
              onPress={() => {
                setIsEditing(true)
              }}
            />
          )
        }
      />
      <Optional
        condition={isEditing}
        fallback={
          <Optional
            condition={MOCK_COURSES.length > 0}
            fallback={<EmptyCard title={t('Have you completed any courses yet?')} onPress={() => setIsEditing(true)} />}
          >
            <FlatList
              data={MOCK_COURSES}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => <CvViewCredential {...item} onEdit={() => console.log('edit me')} />}
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
