import { NormalHeader, ViewContainer } from 'components'
import Text from 'components/Typography'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'

import styles from './Skills.styles'
import SkillsForm from './SkillsForm/Skills'

interface Props {
  navigation: any
}

const Skills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  // TODO: adding static data for UI
  const [skills, setSkills] = useState([])
  const formRef = useRef<any>()

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Skills')}
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
          <SkillsForm />
        </>
      ) : (
        <FlatList data={skills} renderItem={() => <Text.Body>render</Text.Body>} />
      )}
    </ViewContainer>
  )
}

export default Skills
