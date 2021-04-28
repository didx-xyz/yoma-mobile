import { Card, NormalHeader, Optional, ViewContainer } from 'components'
import InfoCard from 'components/InfoCard'
import Text from 'components/Typography'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './Education.styles'
import { EducationValue } from './Education.types'
import EducationForm from './EducationForm/EducationForm'

interface Props {
  navigation: any
}

const Education = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  // TODO: adding static data for UI
  const [education, setEducation] = useState([
    {
      qualification: 'BA Degree',
      organisationLogoURL: '',
      school: 'Rhodes University',
      endDate: '03/01/2021',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      qualification: 'Matric',
      organisationLogoURL: '',
      school: 'South Africa',
      endDate: '04/01/2020',
      description: '',
    },
  ])
  const formRef = useRef<FormikProps<FormikValues>>()

  const renderItem = ({ description, endDate, organisationLogoURL, qualification, school }: EducationValue) => {
    return (
      <InfoCard
        title={school}
        subtitle={qualification}
        description={description}
        endDate={endDate}
        logo={organisationLogoURL}
      />
    )
  }

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
        fallback={
          <FlatList data={education} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.school} />
        }
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
