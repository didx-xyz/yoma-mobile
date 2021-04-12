import { ViewContainer, HomeHeader, FirstTimeCard, CvCard } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, View } from 'react-native'
import { Colors, colors, TextStyles } from 'styles'

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
                  backgroundColor: colors[Colors.tertiary12],
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
                  backgroundColor: colors[Colors.tertiary13],
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
                  backgroundColor: colors[Colors.tertiary12],
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
