import { BlueHollowCircle, BlueTick } from 'assets/images'
import { CustomInput, Spinner, DatePicker, DropDownTags, InfoModal, Upload, Optional } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { INITIAL_VALUES, MOCKED_SKILLS_DATA } from './EducationForm.constants'
import styles from './EducationForm.styles'
import ValidationSchema from './ValidationSchema'

interface Props {
  navigation: any
}

const EducationForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isStudying, setIsStudying] = useState(false)
  const [skillsList, setSkillsList] = useState(MOCKED_SKILLS_DATA)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [showInfoModal, setShowInfoModal] = useState(false)

  const formRef = useRef<FormikProps<FormikValues>>()

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  return (
    <Formik
      innerRef={formRef}
      initialValues={INITIAL_VALUES}
      enableReinitialize={true}
      validationSchema={ValidationSchema}
    >
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.form}>
          <InfoModal
            visible={showInfoModal}
            closeModal={() => setShowInfoModal(false)}
            infoText={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
            }
          />
          <Spinner visible={isSubmitting} />
          <CustomInput
            onChangeText={handleChange('school')}
            onBlur={handleBlur('school')}
            value={values.school}
            label={t('School')}
            isTouched={touched.school}
            error={errors.school}
            showTitle={values.school !== ''}
          />
          <CustomInput
            onChangeText={handleChange('qualificationType')}
            onBlur={handleBlur('qualificationType')}
            value={values.qualificationType}
            label={t('Qualification type')}
            isTouched={touched.school}
            error={errors.school}
            showTitle={values.school !== ''}
          />
          <CustomInput
            onChangeText={handleChange('country')}
            onBlur={handleBlur('country')}
            value={values.country}
            label={t('Country or region')}
            isTouched={touched.country}
            error={errors.country}
            showTitle={values.country !== ''}
          />
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setIsStudying(!isStudying)
              }}
              style={styles.checkBox}
            >
              <Optional condition={isStudying} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body>{t('I currently study here')}</Text.Body>
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
            searchablePlaceholderTextColor="gray"
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
          <TouchableOpacity onPress={() => setShowInfoModal(true)} style={styles.bottom}>
            <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} style={styles.bottomText}>
              {t('Find inspiration on how to write a great education description.')}
            </Text.Meta>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
})

export default EducationForm
