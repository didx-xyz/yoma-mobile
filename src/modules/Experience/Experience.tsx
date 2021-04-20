import api from 'api'
import { EditIcon } from 'assets/images'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { format } from 'date-fns'
import { USER_ID } from 'helpers/helpers'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, colors } from 'styles'

import styles from './Experience.styles'
import ExperienceForm from './ExperienceForm/ExperienceForm'
import { ExperienceType } from './experience.types'

interface Props {
  navigation: any
}

const Experience = ({ navigation }: Props) => {
  const { t } = useTranslation()
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

  const calculateDifferenceInDate = (date1: Date, date2: Date) => {
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

  const renderItem = ({ item }: { item: ExperienceType }) => {
    return (
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
              titleStyle={{ color: colors[Colors.menuGrey] }}
            />
          )}
          <View>
            <Text.Header level={HeaderLevels.h6} color={Colors.primaryDarkGrey}>
              {item.job.title}
            </Text.Header>
            <Text.Body level={BodyLevels.small} color={Colors.menuGrey}>
              {item.job.organisationName}
            </Text.Body>
            <View style={styles.row}>
              <Text.Body level={BodyLevels.small} color={Colors.menuGrey}>
                {format(new Date(item.startDate), 'MMM yyyy')} -{' '}
              </Text.Body>
              <Text.Body level={BodyLevels.small} color={Colors.menuGrey}>
                {format(new Date(item.endDate), 'MMM yyyy')}
                &nbsp;{calculateDifferenceInDate(new Date(item.startDate), new Date(item.endDate))}
              </Text.Body>
            </View>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <EditIcon />
          </TouchableOpacity>
        </View>
        <Text.Body>{item.job.description}</Text.Body>
      </View>
    )
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader
        navigation={navigation}
        headerText={t('Experience')}
        onSave={() => {
          formRef.current.handleSubmit()
        }}
        onAdd={() => {
          setIsSave(true)
        }}
        add={!isSave}
      />
      {isSave ? (
        <ScrollView>
          <View style={styles.whiteCard}>
            <ExperienceForm navigation={navigation} ref={formRef} />
          </View>
        </ScrollView>
      ) : (
        <FlatList data={experience} renderItem={renderItem} keyExtractor={item => item.id} />
      )}
    </ViewContainer>
  )
}

export default Experience
