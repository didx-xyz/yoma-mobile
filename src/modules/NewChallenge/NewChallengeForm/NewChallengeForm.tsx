import { BlueHollowCircle, BlueTick, IconInfo } from 'assets/images'
import { CustomInput, Spinner, DatePicker, DropDownTags, Upload, Optional } from 'components'
import Text from 'components/Typography'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { INITIAL_VALUES, MOCK_SKILLS } from './NewChallengeForm.constants'
import styles from './NewChallengeForm.styles'

interface Props {
  navigation: any
}

const NewChallengeForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isInProgress, setIsInProgress] = useState(false)
  const [skillsList, setSkillsList] = useState(MOCK_SKILLS)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requestVerification, setRequestVerification] = useState<boolean>(false)
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
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.form}>
          <Spinner visible={isSubmitting} />
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
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsInProgress(!isInProgress)
              }}
              style={styles.checkBox}
            >
              <Optional condition={isInProgress} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body color={Colors.menuGrey}>{t('Challenge is currently in progress')}</Text.Body>
          </View>
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
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              onPress={() => {
                setRequestVerification(!requestVerification)
              }}
              style={styles.checkBox}
            >
              <Optional condition={requestVerification} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body color={Colors.menuGrey}>{t('Request verification of employment from company')}</Text.Body>
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
