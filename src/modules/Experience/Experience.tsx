import api from 'api'
import { EditIcon } from 'assets/images'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { USER_ID } from 'helpers/helpers'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, colors, TextStyles } from 'styles'

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

  function calcDate(date1: Date, date2: Date) {
    let diff = Math.floor(date1.getTime() - date2.getTime())
    let day = 1000 * 60 * 60 * 24

    let days = Math.floor(diff / day)
    let months = Math.floor(days / 31)
    let years = Math.floor(months / 12)

    let message = ''
    years != 0 ? (message += years + ' years ') : null
    // months != 0 ? message += months + " months " : null
    // days != 0 ? message += days + " days " : null

    return message
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.cardView}>
      <View style={styles.row}>
        {item.job.organisationLogoURL ? (
          <Image source={{ uri: item.job.organisationLogoURL }} style={styles.image} />
        ) : (
          <Avatar
            size="small"
            rounded
            title={item.job.organisationName.charAt(0)}
            containerStyle={styles.avatar}
            // titleStyle={{ color: colors[Colors.tertiary4] }}
          />
        )}
        <View>
          <Text style={[TextStyles.h4]}>{item.job.title}</Text>
          {/* <Text style={[TextStyles.h4, { color: colors[Colors.tertiary9] }]}>{item.job.organisationName}</Text> */}
          <View style={{ flexDirection: 'row' }}>
            {/* <Text style={[TextStyles.h4, { color: colors[Colors.tertiary9] }]}>
              {moment(item.startDate).format('MMM YYYY')} -{' '}
            </Text> */}
            {/* <Text style={[TextStyles.h4, { color: colors[Colors.tertiary9] }]}>
              {moment(item.endDate).format('MMM YYYY')}
              &nbsp;{calcDate(new Date(item.startDate), new Date(item.endDate))}
            </Text> */}
          </View>
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={[TextStyles.h4]}>{item.job.description}</Text>
    </View>
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
              <ExperienceForm navigation={navigation} ref={formRef} />
            </View>
          </ScrollView>
        </>
      ) : (
        <FlatList data={experience} renderItem={renderItem} keyExtractor={item => item.id} />
      )}
    </ViewContainer>
  )
}

export default Experience
