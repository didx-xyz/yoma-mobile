import { StackNavigationProp } from '@react-navigation/stack'
import { Card, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
import { FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView } from 'react-native'

import styles from './MyChallenges.styles'
import NewChallengeForm from './NewChallengeForm/NewChallengeForm'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.MyChallenges>
}

const MyChallenges = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [challenges, setChallenges] = useState([])
  const formRef = useRef<FormikProps<FormikValues>>()

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={
          <Optional condition={isEditing} fallback={t('Challenges')}>
            {t('Add challenge')}
          </Optional>
        }
        onSave={formRef.current?.handleSubmit}
        onAdd={() => setIsEditing(true)}
        showAddButton={!isEditing}
      />
      <Optional
        condition={isEditing}
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

export default MyChallenges
