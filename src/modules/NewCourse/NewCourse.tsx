import { ColorCard, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './NewCourse.styles'
import NewCourseForm from './NewCourseForm/NewCourseForm'

interface Props {
  navigation: any
}

const NewCourse = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  const [courses, setCourses] = useState([])
  const formRef = useRef<any>()

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Courses')}
        onSave={() => {
          formRef.current.handleSubmit()
        }}
        onAdd={() => {
          setIsSave(true)
        }}
        add={!isSave}
      />
      <Optional
        condition={isSave}
        fallback={<FlatList data={courses} renderItem={({ item }) => <Text.Body>render</Text.Body>} />}
      >
        <ScrollView>
          <ColorCard>
            <NewCourseForm navigation={navigation} ref={formRef} />
          </ColorCard>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default NewCourse
