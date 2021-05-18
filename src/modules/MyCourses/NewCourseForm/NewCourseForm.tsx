import { StackNavigationProp } from '@react-navigation/stack'
import { IconInfo } from 'assets/images'
import { Spinner, DatePicker, DropDownTags, Upload, CheckBox, Input } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import { HomeNavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { INITIAL_VALUES, MOCK_SKILLS_LIST } from './NewCourseForm.constants'
import styles from './NewCourseForm.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MyCourses>
}

const NewCourseForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isCourseActive, setIsCourseActive] = useState<boolean>(false)
  const [skillsList, setSkillsList] = useState(MOCK_SKILLS_LIST)
  const [shouldRequestVerification, setShouldRequestVerification] = useState<boolean>(false)

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={() => {}}>
      {(formikHandlers: FormikProps<FormikValues>) => (
        <View style={styles.form}>
          <Spinner visible={formikHandlers.isSubmitting} />
          <Input name={'course'} label={t('Course name')} handlers={formikHandlers} />
          <Input name={'courseHostProvider'} label={t('Course host provider')} handlers={formikHandlers} />
          <CheckBox
            isChecked={isCourseActive}
            label={t('Course is currently in progress')}
            onPress={() => setIsCourseActive(!isCourseActive)}
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
          <Input name={'description'} label={t('Description')} handlers={formikHandlers} multiline />
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

export default NewCourseForm
