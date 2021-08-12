import { IconInfo } from 'assets/images'
import { DatePicker, DropDownTags, Upload, CheckBox, Input, FormWrapper } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { INITIAL_VALUES, MOCK_SKILLS } from './UserChallenge.form.constants'
import styles from './UserChallenge.form.styles'

const UserChallengeForm = forwardRef((_props, ref) => {
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
    <Formik
      // TODO - we will refactor this when we get everything working
      // @ts-ignore
      innerRef={formRef}
      initialValues={INITIAL_VALUES}
      onSubmit={() => {}}
    >
      {formikHandlers => (
        <FormWrapper>
          <Input name={'challenge'} label={t('Challenge')} handlers={formikHandlers} />
          <Input name={'challengeHostProvider'} label={t('UserChallenge host provider')} handlers={formikHandlers} />
          <CheckBox
            isChecked={isInProgress}
            label={t('UserChallenge is currently in progress')}
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
  )
})

export default UserChallengeForm
