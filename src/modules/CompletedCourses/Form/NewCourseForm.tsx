import { IconInfo } from 'assets/images'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { DropDownTags, FormLayout, Input, Spinner } from '../../../components'
import CheckBox from '../../../components/CheckBox'
import DateRangeSelect from '../../../components/DateRangeSelect'
import Upload from '../../../components/Upload'
import { INITIAL_VALUES, MOCK_SKILLS_LIST } from './NewCourseForm.constants'
import styles from './NewCourseForm.styles'

const NewCourseForm = forwardRef((_props, _ref) => {
  const { t } = useTranslation()
  const [isCourseActive, setIsCourseActive] = useState<boolean>(false)
  const [shouldRequestVerification, setShouldRequestVerification] = useState<boolean>(false)

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={() => {}}>
      {(formikHandlers: FormikProps<FormikValues>) => (
        <FormLayout>
          <Spinner visible={formikHandlers.isSubmitting} />
          <Input name={'course'} label={t('Course name')} handlers={formikHandlers} />
          <Input name={'courseHostProvider'} label={t('Course host provider')} handlers={formikHandlers} />
          <CheckBox
            isChecked={isCourseActive}
            label={t('Course is currently in progress')}
            onPress={() => setIsCourseActive(!isCourseActive)}
          />
          <DateRangeSelect label={t('When did you do the course?')} />
          <Input name={'description'} label={t('Description')} handlers={formikHandlers} multiline />
          <DropDownTags
            items={MOCK_SKILLS_LIST}
            multiple
            searchPlaceholder={t('Search skills')}
            label={t('Skills developed')}
            name={'skillNames'}
            handlers={formikHandlers}
          />
          <Upload name="upload" label={t('Upload certification (if completed)')} />
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
        </FormLayout>
      )}
    </Formik>
  )
})

export default NewCourseForm
