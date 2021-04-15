import NormalHeader from 'components/NormalHeader/NormalHeader'
import Text from 'components/Typography'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import styles from './Education.styles'
import EducationForm from './EducationForm/Education'

interface Props {
  navigation: any
}

const Education = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  const [education, setEducation] = useState([])
  const formRef = useRef<any>()

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
      {isSave ? (
        <>
          <ScrollView>
            <View style={styles.whiteCard}>
              <EducationForm navigation={navigation} ref={formRef} />
            </View>
          </ScrollView>
        </>
      ) : (
        <FlatList
          data={education}
          renderItem={() => <Text.Body>RenderItem</Text.Body>}
          keyExtractor={item => item.id}
        />
      )}
    </ViewContainer>
  )
}

export default Education
