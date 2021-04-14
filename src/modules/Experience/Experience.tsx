import api from 'api'
import { EditIcon } from 'assets/images'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import Text, { BodyLevels, Bold, HeaderLevels, TextAlign } from 'components/Typography'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { USER_ID } from 'helpers/helpers'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, colors } from 'styles'

import styles from './Experience.styles'
import ExperienceForm from './ExperienceForm/ExperienceForm'

interface Props {
  navigation: any
}

const Experience = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [credentialId, setCredentialId] = useState('')
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
              {moment(item.startDate).format('MMM YYYY')} -{' '}
            </Text.Body>
            <Text.Body level={BodyLevels.small} color={Colors.menuGrey}>
              {moment(item.endDate).format('MMM YYYY')}
              &nbsp;{calculateDifferenceInDate(new Date(item.startDate), new Date(item.endDate))}
            </Text.Body>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => {
            setIsSave(true)
            setIsEdit(true)
            setCredentialId(item.id)
          }}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text.Body>{item.job.description}</Text.Body>
    </View>
  )

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
      {isSave || isEdit ? (
        <>
          <ScrollView>
            <View style={styles.whiteCard}>
              <ExperienceForm navigation={navigation} credentialId={credentialId} ref={formRef} />
            </View>
            {isEdit ? (
              <TouchableOpacity>
                <Text.Body align={TextAlign.center} style={styles.deleteText}>
                  <Bold color={Colors.menuGrey}>{t('Delete experience')}</Bold>
                </Text.Body>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </>
      ) : (
        <FlatList data={experience} renderItem={renderItem} keyExtractor={item => item.id} />
      )}
    </ViewContainer>
  )
}

export default Experience
