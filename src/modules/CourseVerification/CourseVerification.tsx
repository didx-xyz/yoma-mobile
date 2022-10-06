import { useRoute } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { mergeRight } from 'ramda'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import { useDispatch, useSelector } from 'react-redux'

import { apiConfig, utils as ApiUtils } from '~/api'
import { constants as ApiUsersConstants, types as ApiUsersTypes } from '~/api/users'
import Button from '~/components/Button'
import Card from '~/components/Card'
import CheckBox from '~/components/CheckBox'
import DateRangeSelect from '~/components/DateRangeSelect'
import Header from '~/components/Header'
import Text, { Link } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import { HomeNavigatorParamsList } from '~/modules/HomeNavigation/HomeNavigation.types'

import { opportunities } from '../Opportunities/Opportunities.types'
import { actions as UserChallanges } from '../UserChallenges'
import styles from './CourseVerification.style'

type Props = {
  navigation: NativeStackNavigationProp<HomeNavigatorParamsList>
  form: any
}

const CourseVerification = ({ navigation, form }: Props) => {
  const userId = useSelector(state => state.user.id)

  const [isVerified, setIsVerified] = useState(false)
  const { t } = useTranslation()
  const route = useRoute()
  const dispatch = useDispatch()
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
                form.values.requestVerification = !isVerified
              }}
            />
          </ViewContainer>
          <Button
            label={t('Upload completion certificate')}
            style={styles.buttonStyle}
            onPress={async () => {
              try {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
                })
                form.values.certificate = res[0]
                form.values.credentialItemId = data.id
                console.log(form.values, 'formValues')

                // const config = ApiUtils.prependValueToEndpointInConfig(
                //   ApiUsersConstants.USERS_CREDENTIALS_CREATE_CONFIG,
                // )(userId)
                // apiConfig
                //   .createApiClient(
                //     mergeRight(config, {
                //       data: form.values,
                //     }),
                //   )
                //   .then(res => {
                //     console.log('response', res)
                //   })

                dispatch(UserChallanges.createUserChallenge(form.values))
                // fetch(`https://staging.api.yoma.africa/api/v1/users/${userId}/credentials/c88e1c73-a738-48ab-167f-08daa155160f/certificate`)
              } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                } else {
                  throw err
                }
              }
              form.handleSubmit()
            }}
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
