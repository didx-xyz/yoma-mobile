import { StackNavigationProp } from '@react-navigation/stack'
import { IconInfo } from 'assets/images'
import { CustomInput, DatePicker, DropDownTags, Upload, CheckBox } from 'components'
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
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
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
      {({ handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
        <View style={styles.form}>
          <CustomInput
            onChangeText={handleChange('challenge')}
            onBlur={handleBlur('challenge')}
            value={values.challenge}
            label={t('Challenge')}
            isTouched={touched.challenge}
            error={errors.challenge}
            showTitle={values.challenge !== ''}
          />
          <CustomInput
            onChangeText={handleChange('challengeHostProvider')}
            onBlur={handleBlur('challengeHostProvider')}
            value={values.challengeHostProvider}
            label={t('Challenge host provider')}
            isTouched={touched.challengeHostProvider}
            error={errors.challengeHostProvider}
            showTitle={values.challengeHostProvider !== ''}
          />
          <CheckBox
            isChecked={isInProgress}
            label={t('Challenge is currently in progress')}
            onPress={() => setIsInProgress(!isInProgress)}
          />
          <View style={styles.row}>
            <DatePicker
              onDateChange={(date: string) => {
                handleChange('startDate')
                handleBlur('startDate')
                setFieldValue('startDate', date)
              }}
              value={values.startDate}
              label={t('Start date')}
              isTouched={touched.startDate}
              error={errors.startDate}
              showTitle={values.startDate !== ''}
            />
            <DatePicker
              onDateChange={(date: string) => {
                handleChange('endDate')
                handleBlur('endDate')
                setFieldValue('endDate', date)
              }}
              value={values.endDate}
              label={t('End date')}
              isTouched={touched.endDate}
              error={errors.endDate}
              showTitle={values.endDate !== ''}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={t('Description')}
            isTouched={touched.description}
            error={errors.description}
            multiline
            showTitle={values.description !== ''}
          />
          <DropDownTags
            items={skillsList}
            multiple={true}
            multipleText={t('Skills developed %d')}
            min={0}
            max={10}
            searchable={true}
            searchablePlaceholder={t('Search skills')}
            placeholder={t('Skills developed')}
            fieldName={t('Skills developed')}
            placeholderStyle={styles.placeholder}
            showTitle={values.skillNames.length > 0}
            defaultValue={selectedSkills}
            onChangeItem={item => {
              setSelectedSkills(item)
              handleChange('skillNames')
              handleBlur('skillNames')
              setFieldValue('skillNames', selectedSkills)
            }}
            tags={selectedSkills}
            error={errors.skillNames}
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
