import { NormalHeader, ViewContainer } from 'components'
import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import styles from './Skills.styles'
import SkillsForm from './SkillsForm/Skills'

interface Props {
  navigation: any
}

const Skills = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  // TODO: adding static data for UI
  const [skills, setSkills] = useState([
    {
      skill: 'Graphic Design',
      count: 3,
    },
    {
      skill: 'Photograph',
      count: 45,
    },
    {
      skill: 'Illustration',
      count: 12,
    },
    {
      skill: 'Figma',
      count: 3,
    },
    {
      skill: 'Keynote',
      count: 22,
    },
  ])
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
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <View style={styles.certificateCountView}>
              <Text.Header level={HeaderLevels.h6} color={Colors.primaryBlue}>
                60
              </Text.Header>
            </View>
            <Text.Header level={HeaderLevels.h5} color={Colors.primaryPurple}>
              {t('Top skills')}
            </Text.Header>
          </View>
          <FlatList
            data={skills}
            renderItem={({ item }) => (
              <View style={styles.bodyItemView}>
                <Text.Header level={HeaderLevels.h6}>
                  {item.skill}
                  <Text.Body level={BodyLevels.small}> • {item.count}</Text.Body>
                </Text.Header>
                <TouchableOpacity>
                  <Text.Header level={HeaderLevels.h6}>{t('Skills acquired')}</Text.Header>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.skill}
          />
        </View>
      )}
    </ViewContainer>
  )
}

export default Skills
