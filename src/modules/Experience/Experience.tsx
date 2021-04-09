import api from 'api'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { USER_ID } from 'helpers/helpers'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { TextStyles } from 'styles'

import styles from './Experience.styles'
import ExperienceForm from './ExperienceForm/ExperienceForm'

interface Props {
  navigation: any
}

const Experience = ({ navigation }: Props) => {
  const [isSave, setIsSave] = useState(false)
  const [experience, setExperience] = useState([])
  const formRef = useRef<any>()

  useEffect(() => {
    const getAllJobs = async () => {
      // TODO: added static type
      const response = await api.users.credentials.getByType(USER_ID, 'Job')
      console.log(response.data)
      setExperience(response.data)
    }
    getAllJobs()
  }, [])

  const renderItem = ({ item }: any) => (
    <Text>{item.job.title}</Text>
    // <View style={}>

    // </View >
  )

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={'Experience'}
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
              <ExperienceForm ref={formRef} />
            </View>
            {/* <TouchableOpacity>
                <Text style={[TextStyles.textTertiary9, TextStyles.semiBoldText, { marginVertical: 20 }]}>
                  Delete experience
                </Text>
              </TouchableOpacity> */}
          </ScrollView>
        </>
      ) : (
        <FlatList data={experience} renderItem={renderItem} keyExtractor={item => item.id} />
      )}
    </ViewContainer>
  )
}

export default Experience
