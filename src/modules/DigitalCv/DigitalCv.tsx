import { EditIcon } from 'assets/Images'
import CvCard from 'components/CvCard/CvCard'
import FirstTimeCard from 'components/FirstTimeCard/FirstTimeCard'
import HomeHeader from 'components/HomeHeader/HomeHeader'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'

import ViewContainer from '../../components/ViewContainer/ViewContainer'
import styles from './DigitalCv.styles'

interface Props {
  navigation: any
}

const DigitalCv = ({ navigation }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
        <FirstTimeCard navigation={navigation} />
        <CvCard
          cardTitle={t('About')}
          defaultText={t('Your biography is one of the first things recruiters look at. Write a great one!')}
          onEdit={() => navigation.navigate('About')}
        />
        <CvCard
          certCount={
            <View
              style={[
                styles.certificateCountView,
                {
                  backgroundColor: 'rgba(229,247,253,1)',
                },
              ]}
            >
              <Text style={[TextStyles.boldText, { color: colors[Colors.tertiary7] }]}>0</Text>
            </View>
          }
          cardTitle={t('Experience')}
          defaultText={t('Where do you currently work?')}
        />
        <CvCard
          certCount={
            <View
              style={[
                styles.certificateCountView,
                {
                  backgroundColor: 'rgba(255,228,230,1)',
                },
              ]}
            >
              <Text style={[TextStyles.boldText, { color: colors[Colors.tertiary1] }]}>0</Text>
            </View>
          }
          cardTitle={t('Education')}
          defaultText={t('Which school, university or college did you attend?')}
        />
        <CvCard
          certCount={
            <View
              style={[
                styles.certificateCountView,
                {
                  backgroundColor: 'rgba(229,247,253,1)',
                },
              ]}
            >
              <Text style={[TextStyles.boldText, { color: colors[Colors.tertiary7] }]}>0</Text>
            </View>
          }
          cardTitle={t('My skills')}
          defaultText={t('Tell us what you are great at.')}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default DigitalCv
