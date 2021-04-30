import { Card, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './NewChallenge.styles'
import NewChallengeForm from './NewChallengeForm/NewChallengeForm'

interface Props {
  navigation: any
}

const NewChallenge = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSaved, setIsSaved] = useState(false)
  const [challenges, setChallenges] = useState([])
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isSaved} fallback={t('Challenges')}>
            {t('Add challenge')}
          </Optional>
        }
        onSave={() => {
          formRef.current.handleSubmit()
        }}
        onAdd={() => setIsSaved(true)}
        showAddButton={!isSaved}
      />
      <Optional
        condition={isSaved}
        fallback={<FlatList data={challenges} renderItem={() => <Text.Body>render</Text.Body>} />}
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
