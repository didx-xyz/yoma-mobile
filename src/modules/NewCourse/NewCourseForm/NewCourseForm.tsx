import { BlueHollowCircle, BlueTick, IconInfo } from 'assets/images'
import { CustomInput, Spinner, DatePicker, DropDownTags, Upload, Optional } from 'components'
import Text from 'components/Typography'
import { Formik } from 'formik'
import React, { forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { INITIAL_VALUES, MOCK_SKILLS_LIST } from './NewCourseForm.constants'
import styles from './NewCourseForm.styles'

interface Props {
  navigation: any
}

const NewCourseForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isCourseActive, setIsCourseActive] = useState<boolean>(false)
  const [skillsList, setSkillsList] = useState(MOCK_SKILLS_LIST)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [shouldRequestVerification, setShouldRequestVerification] = useState<boolean>(false)

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={() => {}}>
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.form}>
          <Spinner visible={isSubmitting} />
          <CustomInput
            onChangeText={handleChange('course')}
            onBlur={handleBlur('course')}
            value={values.course}
            label={t('Course name')}
            isTouched={touched.course}
            error={errors.course}
            showTitle={values.course !== ''}
          />
          <CustomInput
            onChangeText={handleChange('courseHostProvider')}
            onBlur={handleBlur('courseHostProvider')}
            value={values.courseHostProvider}
            label={t('Course host provider')}
            isTouched={touched.courseHostProvider}
            error={errors.courseHostProvider}
            showTitle={values.courseHostProvider !== ''}
          />
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity onPress={() => setIsCourseActive(!isCourseActive)} style={styles.checkBox}>
              <Optional condition={isCourseActive} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body color={Colors.menuGrey}>{t('Course is currently in progress')}</Text.Body>
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
            onDelete={() => {}}
          />
          <Upload onPress={() => {}} />
          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              onPress={() => setShouldRequestVerification(!shouldRequestVerification)}
              style={styles.checkBox}
            >
              <Optional condition={shouldRequestVerification} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body color={Colors.menuGrey} style={styles.verificationText}>
              {t('Request verification of completion from provider')}
            </Text.Body>
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
