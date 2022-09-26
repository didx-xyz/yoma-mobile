import { useRoute } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import Button from '~/components/Button'
import Card from '~/components/Card'
import CheckBox from '~/components/CheckBox'
import DateRangeSelect from '~/components/DateRangeSelect'
import Header from '~/components/Header'
import Text, { Link } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import { HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

import { opportunities } from '../Opportunities/Opportunities.types'
import styles from './CourseVerification.style'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
  form: any
}

const CourseVerification = ({ navigation, form }: Props) => {
  const [isVerified, setIsVerified] = useState(false)
  const { t } = useTranslation()
  const route = useRoute()
  const data: opportunities = route.params as opportunities
  const goto = () => {}
  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText=" Verify Challenge " actionItem={<View />} />
      <ScrollView>
        <Card style={styles.card}>
          <Text.Body style={[styles.name]}>{t('Congratulations for completing the')} </Text.Body>
          <Text.Body style={styles.title}>{data?.title}</Text.Body>
          <Text.Body style={styles.text}>{t('Please let us know when you completed the challenge')}</Text.Body>
          <DateRangeSelect />
          <ViewContainer style={styles.checkBox}>
            <CheckBox
              isChecked={isVerified}
              label={t('Request verification of completion from provider')}
              onPress={() => {
                setIsVerified(!isVerified)
                form.values.isVerified = !isVerified
              }}
            />
          </ViewContainer>
          <Button
            label={t('Upload completion certificate')}
            style={styles.buttonStyle}
            onPress={() => form.handleSubmit()}
          />
          <View style={styles.verticalLine} />
          <Link style={styles.linkStyle} onPress={goto}>
            {t('Find out more on how verification works.')}
          </Link>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default CourseVerification
