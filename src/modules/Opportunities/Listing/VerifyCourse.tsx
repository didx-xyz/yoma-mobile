//import { NativeStackNavigationProp } from '@react-navigation/native-stack'
//import { useRoute } from '@react-navigation/core'
//import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'

//import DatePicker from '~/components/DatePicker'
//import DateRangeSelect from '~/components/DateRangeSelect'
import Text from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'

//import { opportunities } from '../Opportunities.types'
//import { HomeNavigationRoutes, HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'
import styles from './verifyCourse.styles'

const VerifyCourse = () => {
  const { t } = useTranslation()
  //const route = useRoute()
  //const data: opportunities = route.params as opportunities
  return (
    <ViewContainer style={styles.container}>
      <SafeAreaView>
        <View style={styles.viewcontainer}>
          <View style={styles.nameContainer}>
            <Text.Body style={[styles.name]}>{t('Congratulations for completing the')} </Text.Body>
          </View>

          <View style={styles.titleViewContainer}>
            <Text.Body style={styles.title}>Title</Text.Body>
          </View>
          <View>
            <Text.Body>{t('Please let us know when you completed the challenge')}</Text.Body>
          </View>
        </View>
      </SafeAreaView>
    </ViewContainer>
  )
}

export default VerifyCourse
