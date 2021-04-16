import { EditIcon } from 'assets/images'
import NormalHeader from 'components/NormalHeader/NormalHeader'
import Text, { BodyLevels, HeaderLevels } from 'components/Typography'
import ViewContainer from 'components/ViewContainer/ViewContainer'
import { format } from 'date-fns'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler'
import { Colors } from 'styles'

import styles from './Education.styles'
import EducationForm from './EducationForm/Education'

interface Props {
  navigation: any
}

const Education = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const [isSave, setIsSave] = useState(false)
  // TODO: adding static data for UI
  const [education, setEducation] = useState([
    {
      qualification: 'BA Degree',
      organisationLogoURL: '',
      school: 'Rhodes University',
      endDate: '03/01/2021',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    },
    {
      qualification: 'Matric',
      organisationLogoURL: '',
      school: 'South Africa',
      endDate: '04/01/2020',
      description: '',
    },
  ])
  const formRef = useRef<any>()

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.cardView}>
        <View style={styles.row}>
          {item.organisationLogoURL ? (
            <Image source={{ uri: item.organisationLogoURL }} style={styles.image} />
          ) : (
            <Avatar size="small" rounded title={item.school.charAt(0)} containerStyle={styles.avatar} />
          )}
          <View>
            <Text.Header level={HeaderLevels.h6} color={Colors.primaryDarkGrey}>
              {item.qualification + ' : ' + item.school}
            </Text.Header>
            <View style={styles.row}>
              <Text.Body level={BodyLevels.small} color={Colors.menuGrey}>
                {format(new Date(item.endDate), 'MMM yyyy')}
              </Text.Body>
            </View>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <EditIcon />
          </TouchableOpacity>
        </View>
        {item.description ? <Text.Body>{item.description}</Text.Body> : null}
      </View>
    )
  }

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
        <FlatList data={education} renderItem={item => renderItem(item)} keyExtractor={item => item.id} />
      )}
    </ViewContainer>
  )
}

export default Education
