import { useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
//import { useTranslation } from 'react-i18next'
import { Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { GreenBottomRightShade, ThreeDot, ZIcon } from '~/assets/images'
import Button from '~/components/Button'
import DateDisplay from '~/components/DateDisplay'
import Header from '~/components/Header'
import { Bold } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import { Colors } from '~/styles'

import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { opportunities } from '../Opportunities/Opportunities.types'
import styles from './CourseDetails.styles'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
}

const CourseDetials = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const route = useRoute()
  const data: opportunities = route.params as opportunities

  return (
    <>
      <Header navigation={navigation} headerText="" actionItem={<ThreeDot />} headCombine={true} />
      <ViewContainer style={styles.container}>
        <View style={styles.bgContainer}>
          <View style={styles.OrganizationInfoContainer}>
            <View style={styles.imageViewContainer}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: data?.organisationLogoURL,
                }}
              />
            </View>
            <View style={styles.nameContainer}>
              <Text style={[styles.name]}>{data.organisationName}</Text>
            </View>
          </View>
          <View style={styles.titleViewContainer}>
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>13 hours • {data.difficulty}• </Text>
            <Text style={styles.bottomText}>
              Starts <DateDisplay date={data.startTime} template={'dd MMM yyyy'} /> • 30 participants
            </Text>
          </View>
          <GreenBottomRightShade style={styles.bgCircle} />
        </View>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.tokensView}>
            <ZIcon />
            <Text style={styles.tokenAmount}>
              <Bold color={Colors.PrimaryYellow}>{data.zltoReward}</Bold>
            </Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollInnerContainer}>
            <View style={styles.biographyContainer}>
              <Text style={styles.biography}>{data.description}</Text>
            </View>
            <View>
              <Button
                label={t('Go to Opportunity')}
                onPress={() => navigation.navigate(HomeNavigationRoutes.MyWeb, { url: data.organisationURL })}
                style={styles.button1}
              />
              <Button
                color={Colors.PrimaryGreen}
                label={t('I have Completed this')}
                style={styles.button2}
                onPress={() => navigation.navigate(HomeNavigationRoutes.CourseVerification, data)}
              />
            </View>
          </ScrollView>
        </View>
      </ViewContainer>
    </>
  )
}

export default CourseDetials
