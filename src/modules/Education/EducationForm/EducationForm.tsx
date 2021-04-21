import { BlueHollowCircle, BlueTick } from 'assets/images'
import { CustomInput, Spinner, DatePicker, DropDownTags, InfoModal, Upload, Optional } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { Formik } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { INITIAL_VALUES } from './EducationForm.constants'
import styles from './EducationForm.styles'
import ValidationSchema from './ValidationSchema'

interface Props {
  navigation: any
}

const EducationForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [present, setPresent] = useState(false)
  // TODO: Adding static data to complete the UI
  const [skillsList, setSkillsList] = useState([
    { label: 'UI', value: 'UI' },
    { label: 'Design', value: 'Design' },
    { label: 'UX', value: 'UX' },
  ])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [infoModal, setInfoModal] = useState(false)

  const formRef = useRef<any>()

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
      onSubmit={values => {}}
    >
      {({ handleChange, handleBlur, values, touched, errors, isSubmitting, setFieldValue }) => (
        <View style={styles.formView}>
          <InfoModal
            visible={infoModal}
            closeModal={() => setInfoModal(false)}
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
            touched={touched.school}
            error={errors.school}
            showTitle={values.school !== ''}
          />
          <CustomInput
            onChangeText={handleChange('qualificationType')}
            onBlur={handleBlur('qualificationType')}
            value={values.qualificationType}
            label={t('Qualification type')}
            touched={touched.school}
            error={errors.school}
            showTitle={values.school !== ''}
          />
          <CustomInput
            onChangeText={handleChange('country')}
            onBlur={handleBlur('country')}
            value={values.country}
            label={t('Country or region')}
            touched={touched.country}
            error={errors.country}
            showTitle={values.country !== ''}
          />
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setPresent(!present)
              }}
              style={styles.checkBox}
            >
              <Optional condition={present} fallback={<BlueHollowCircle />}>
                <BlueTick />
              </Optional>
            </TouchableOpacity>
            <Text.Body>{t('I currently study here')}</Text.Body>
          </View>
          <View style={styles.datePickersRowView}>
            <DatePicker
              onChangeDate={(date: string) => {
                console.log(date)
                handleChange('startDate')
                handleBlur('startDate')
                setFieldValue('startDate', date)
              }}
              value={values.startDate}
              label={t('Start date')}
              touched={touched.startDate}
              error={errors.startDate}
              showTitle={values.startDate !== ''}
            />
            <DatePicker
              onChangeDate={(date: string) => {
                handleChange('endDate')
                handleBlur('endDate')
                setFieldValue('endDate', date)
              }}
              value={values.endDate}
              label={t('End date')}
              touched={touched.endDate}
              error={errors.endDate}
              showTitle={values.endDate !== ''}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={t('Description')}
            touched={touched.description}
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
            placeholderStyle={styles.placeholderStyle}
            showTitle={values.skillNames.length > 0}
            defaultValue={selectedSkills}
            onChangeItem={item => {
              setSelectedSkills(item)
              handleChange('skillNames')
              handleBlur('skillNames')
              setFieldValue('skillNames', selectedSkills)
            }}
            tags={selectedSkills}
            touched={touched.skillNames}
            error={errors.skillNames}
          />
          <Upload onPress={() => {}} />
          <TouchableOpacity onPress={() => setInfoModal(true)} style={styles.bottomView}>
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
