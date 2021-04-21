import api from 'api'
import { EditIcon } from 'assets/images'
import { ColorCard, DateDisplay, Optional } from 'components'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { DATE_TPL_MON_YEAR } from 'constants/date.constants'
import { USER_ID } from 'helpers/helpers'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { FlatList } from 'react-native-gesture-handler'
import { Colors, colors } from 'styles'
import { calculateDifferenceInDate } from 'utils/dates.utils'

import styles from './Experience.styles'
import { ExperienceType } from './Experience.types'
import ExperienceForm from './ExperienceForm/ExperienceForm'

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
      setExperience(response.data)
    }
    getAllJobs()
  }, [])

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
              <DateDisplay template={DATE_TPL_MON_YEAR} date={item.startDate}>
                &nbsp; - &nbsp;
              </DateDisplay>
              <DateDisplay template={DATE_TPL_MON_YEAR} date={item.endDate}>
                &nbsp;{calculateDifferenceInDate(item.startDate, item.endDate)}
              </DateDisplay>
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
      <Optional
        condition={isSave}
        fallback={<FlatList data={experience} renderItem={renderItem} keyExtractor={item => item.id} />}
      >
        <ScrollView>
          <ColorCard>
            <ExperienceForm navigation={navigation} ref={formRef} />
          </ColorCard>
        </ScrollView>
      </Optional>
    </ViewContainer>
  )
}

export default Experience
