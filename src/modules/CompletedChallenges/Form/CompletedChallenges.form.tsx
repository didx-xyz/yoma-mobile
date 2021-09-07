import { StackNavigationProp } from '@react-navigation/stack'
import { IconInfo } from 'assets/images'
import { Card, CheckBox, DatePicker, DropDownTags, FormWrapper, Input, Upload, ViewContainer } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Header from '../../../components/Header'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { INITIAL_FORM_VALUES, MOCK_SKILLS } from '../CompletedChallenges.constants'
import styles from './CompletedChallenges.form.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.CompletedChallenges>
}

const CompletedChallengesForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isInProgress, setIsInProgress] = useState(false)
  const [skillsList] = useState(MOCK_SKILLS)
  const [shouldRequestVerification, setShouldRequestVerification] = useState<boolean>(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  // TODO: We need to refactor and fix this
  // @ts-ignore
  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        onSave={formRef.current?.handleSubmit}
        headerText={t('Add challenge')}
        showAddButton={false}
      />
      <ScrollView>
        <Card>
          <Formik
            // TODO - we will refactor this when we get everything working
            // @ts-ignore
            innerRef={formRef}
            initialValues={INITIAL_FORM_VALUES}
            onSubmit={() => {}}
          >
            {formikHandlers => (
              <FormWrapper>
                <Input name={'challenge'} label={t('Challenge')} handlers={formikHandlers} />
                <Input name={'challengeHostProvider'} label={t('Challenge host provider')} handlers={formikHandlers} />
                <CheckBox
                  isChecked={isInProgress}
                  label={t('Challenge is currently in progress')}
                  onPress={() => setIsInProgress(!isInProgress)}
                />
                <View style={styles.row}>
                  <DatePicker name={'startDate'} label={t('Start date')} handlers={formikHandlers} />
                  <DatePicker name={'endDate'} label={t('End date')} handlers={formikHandlers} />
                </View>
                <Input name={'description'} label={t('description')} handlers={formikHandlers} multiline />
                <DropDownTags
                  items={skillsList}
                  multiple
                  searchPlaceholder={t('Search skills')}
                  label={t('Skills developed')}
                  name={'skillNames'}
                  handlers={formikHandlers}
                />
                <Upload onPress={() => {}} />
                <View style={styles.checkBoxRow}>
                  <CheckBox
                    isChecked={shouldRequestVerification}
                    label={t('Request verification of employment from company')}
                    onPress={() => setShouldRequestVerification(!shouldRequestVerification)}
                  />
                  <View style={styles.iconInfo}>
                    <IconInfo />
                  </View>
                </View>
              </FormWrapper>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
})

export default CompletedChallengesForm
