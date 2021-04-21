import { ColorCard, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
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
  const [isSave, setIsSave] = useState(false)
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
  const formRef = useRef<any>()

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
        fallback={
          <FlatList data={education} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.school} />
        }
      >
        <ScrollView>
          <ColorCard>
            <EducationForm navigation={navigation} ref={formRef} />
          </ColorCard>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Education
