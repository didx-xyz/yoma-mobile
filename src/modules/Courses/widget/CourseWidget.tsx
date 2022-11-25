import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import { ZIcon } from '~/assets/images'
import DateDisplay from '~/components/DateDisplay'
import { Bold } from '~/components/Typography'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import { opportunities } from '~/modules/Opportunities/Opportunities.types'
import { Colors } from '~/styles'

import styles from './CourseWidget.style'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
  item: opportunities
}

const CourseWidget = ({ navigation, item }: Props) => {
  return (
    <TouchableOpacity style={[styles.item]}>
      <View style={styles.OrganizationInfoContainer}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name]}>{item?.organisationName}</Text>
        </View>
        <View style={styles.imageViewContainer}>
          <Image style={styles.profileImage} source={{ uri: item?.organisationLogoURL }} />
        </View>
      </View>
      <View style={styles.titleViewContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(HomeNavigationRoutes.CourseDetails, item)}>
          <Text style={styles.title}>{item?.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.biographyContainer}>
        <Text style={styles.biography}>{item?.description}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeftView}>
          <Text style={styles.bottomText}>
            {item.timePeriod} • {item.difficulty} •
          </Text>
          <Text style={styles.bottomText}>
            • Starts {item?.startTime && <DateDisplay date={item.startTime} template={'dd MMM yyyy'} />} • 30
            participants
          </Text>
        </View>
        <TouchableOpacity style={styles.tokensView}>
          <ZIcon />
          <Text style={styles.tokenAmount}>
            <Bold color={Colors.PrimaryYellow}>{item?.zltoReward}</Bold>
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default CourseWidget
