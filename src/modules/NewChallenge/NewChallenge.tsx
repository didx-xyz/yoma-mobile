import { Card, InfoCard, NormalHeader, Optional, ViewContainer } from 'components'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './NewChallenge.styles'
import { ChallengeValue } from './NewChallenge.types'
import NewChallengeForm from './NewChallengeForm/NewChallengeForm'

interface Props {
  navigation: any
}

const NewChallenge = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  const [challenges, setChallenges] = useState([
    {
      challenge: 'COVID Challenge',
      organisationLogoURL: '',
      challengeHostProvider: '',
      endDate: '03/01/2021',
      description: '',
    },
    {
      challenge: 'Beyond your future challenge',
      organisationLogoURL: '',
      challengeHostProvider: '',
      endDate: '04/01/2020',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
  ])
  const formRef = useRef<any>()

  const renderItem = ({ challenge, description, endDate, organisationLogoURL }: ChallengeValue) => {
    return <InfoCard title={challenge} description={description} endDate={endDate} logo={organisationLogoURL} />
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Challenges')}
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
