import { Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import { MOCKED_CHALLENGES } from './NewChallenge.constants'
import styles from './NewChallenge.styles'
import { ChallengeEntry } from './NewChallenge.types'
import NewChallengeForm from './NewChallengeForm/NewChallengeForm'

interface Props {
  navigation: any
}

const NewChallenge = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [challenges, setChallenges] = useState(MOCKED_CHALLENGES)
  const formRef = useRef<FormikProps<FormikValues>>()

  const renderItem = ({ challenge, description, endDate, organisationLogoURL }: ChallengeEntry) => {
    return <InfoCard title={challenge} description={description} endDate={endDate} logo={organisationLogoURL} />
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        onSave={() => formRef.current.handleSubmit()}
        headerText={
          <Optional condition={isSaved} fallback={t('Challenges')}>
            {t('Add challenge')}
          </Optional>
        }
        onAdd={() => setIsSaved(true)}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={
          <FlatList
            data={challenges}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.challenge}
          />
        }
      >
        <ScrollView>
          <Card>
            <NewChallengeForm navigation={navigation} ref={formRef} />
          </Card>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default NewChallenge
