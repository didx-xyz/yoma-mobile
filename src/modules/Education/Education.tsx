import { ColorCard, NormalHeader, Optional, ViewContainer } from 'components'
import Text from 'components/Typography'
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
      <Optional
        condition={isSave}
        fallback={<FlatList data={education} renderItem={() => <Text.Body>RenderItem</Text.Body>} />}
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
