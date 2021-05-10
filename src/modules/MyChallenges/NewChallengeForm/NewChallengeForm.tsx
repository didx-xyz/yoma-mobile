import { StackNavigationProp } from '@react-navigation/stack'
import { IconInfo } from 'assets/images'
import { DatePicker, DropDownTags, Upload, CheckBox, Input } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { INITIAL_VALUES, MOCK_SKILLS } from './NewChallengeForm.constants'
import styles from './NewChallengeForm.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.MyChallenges>
}

const NewChallengeForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isInProgress, setIsInProgress] = useState(false)
  const [skillsList, setSkillsList] = useState(MOCK_SKILLS)
  const [shouldRequestVerification, setShouldRequestVerification] = useState<boolean>(false)
  const formRef = useRef<FormikProps<FormikValues>>()

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  return (
    <Formik innerRef={formRef} initialValues={INITIAL_VALUES} onSubmit={() => {}}>
      {formikHandlers => (
        <View style={styles.form}>
          <Input name={'challenge'} label={t('Challenge')} handlers={formikHandlers} />
          <Input name={'challengeHostProvider'} label={t('Challenge host provider')} handlers={formikHandlers} />
          <CheckBox
            isChecked={isInProgress}
            label={t('Challenge is currently in progress')}
            onPress={() => setIsInProgress(!isInProgress)}
          />
          <View style={styles.row}>
            <DatePicker
              onDateChange={(date: string) => {
                formikHandlers.handleChange('startDate')
                formikHandlers.handleBlur('startDate')
                formikHandlers.setFieldValue('startDate', date)
              }}
              value={formikHandlers.values.startDate}
              label={t('Start date')}
              isTouched={formikHandlers.touched.startDate}
              error={formikHandlers.errors.startDate}
              showTitle={formikHandlers.values.startDate !== ''}
            />
            <DatePicker
              onDateChange={(date: string) => {
                formikHandlers.handleChange('endDate')
                formikHandlers.handleBlur('endDate')
                formikHandlers.setFieldValue('endDate', date)
              }}
              value={formikHandlers.values.endDate}
              label={t('End date')}
              isTouched={formikHandlers.touched.endDate}
              error={formikHandlers.errors.endDate}
              showTitle={formikHandlers.values.endDate !== ''}
            />
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
        </View>
      )}
    </Formik>
  )
})

export default NewChallengeForm
