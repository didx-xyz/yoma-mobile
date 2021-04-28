import { Card, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, FlatList } from 'react-native'

import styles from './Education.styles'
import EducationForm from './EducationForm/EducationForm'

interface Props {
  navigation: any
}

const Education = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [education, setEducation] = useState([])
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Education')}
        onSave={() => formRef.current?.handleSubmit()}
        onAdd={() => {
          setIsSaved(true)
        }}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={<FlatList data={education} renderItem={() => <Text.Body>RenderItem</Text.Body>} />}
      >
        <ScrollView>
          <Card>
            <EducationForm navigation={navigation} ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Education
