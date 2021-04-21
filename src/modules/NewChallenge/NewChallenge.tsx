import { ColorCard, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
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
  const [isSave, setIsSave] = useState(false)
  const [challenges, setChallenges] = useState([])
  const formRef = useRef<any>()

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
        fallback={<FlatList data={challenges} renderItem={() => <Text.Body>render</Text.Body>} />}
      >
        <ScrollView>
          <ColorCard>
            <NewChallengeForm navigation={navigation} ref={formRef} />
          </ColorCard>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default NewChallenge
