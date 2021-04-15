import { BlueHollowCircle, BlueTick } from 'assets/images'
import { CustomInput, Spinner, DatePicker, DropDownTags, InfoModal } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { Formik } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { colors, Colors } from 'styles'

import styles from './Education.styles'
import ValidationSchema from './ValidationSchema'

interface Props {
  navigation: any
}

const INITIAL_VALUES = {
  // details
  school: '',
  description: '',
  id: '',
  // startDate: '2021-04-09T05:52:02.872Z',
  // endDate: '2021-04-09T05:52:02.872Z',
  startDate: '',
  endDate: '',
  verifiedAt: null,

  // country
  country: '',
  // skills developed
  skillNames: [],

  // organisation
  organisationId: '',
  organisationName: '',
  organisationWebsite: '',
  primaryContactName: '',
  primaryContactEmail: '',

  noResultInd: false,
  requestVerificationInd: false,
}

const EducationForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [present, setPresent] = useState(false)
  const [skillsList, setSkillsList] = useState([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requestVerification, setRequestVerification] = useState(false)
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
      onSubmit={async (values, actions) => {
        console.log('values', values)
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isSubmitting, setFieldValue }) => (
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
            showTitle={values.school !== '' ? true : false}
          />
          <CustomInput
            onChangeText={handleChange('school')}
            onBlur={handleBlur('school')}
            value={values.school}
            label={t('Qualification type')}
            touched={touched.school}
            error={errors.school}
            showTitle={values.school !== '' ? true : false}
          />
          <CustomInput
            onChangeText={handleChange('country')}
            onBlur={handleBlur('country')}
            value={values.country}
            label={t('Country or region')}
            touched={touched.country}
            error={errors.country}
            showTitle={values.country !== '' ? true : false}
          />
          <View style={styles.checkBoxView}>
            <TouchableOpacity
              onPress={() => {
                setPresent(!present)
              }}
              style={styles.checkBox}
            >
              {present ? <BlueTick /> : <BlueHollowCircle />}
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
              viewStyle={{ width: '40%' }}
              showTitle={values.startDate !== '' ? true : false}
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
              viewStyle={{ width: '40%' }}
              showTitle={values.endDate !== '' ? true : false}
            />
          </View>
          <CustomInput
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            label={t('Description')}
            touched={touched.description}
            error={errors.description}
            showTitle={values.description !== '' ? true : false}
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
            showTitle={values.skillNames.length > 0 ? true : false}
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
          <View style={{ marginHorizontal: 15 }}>
            <Text.Meta level={MetaLevels.small}>{t('Upload certification (if completed)')}</Text.Meta>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors[Colors.grey4],
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 6,
                justifyContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text.Body>{t('Upload')}</Text.Body>
              <View
                style={{
                  backgroundColor: colors[Colors.white],
                  paddingHorizontal: 10,
                  borderRadius: 25,
                }}
              >
                <Text.Body>{t('Choose file')}</Text.Body>
              </View>
            </View>
            <Text.Meta>{t('.pdf’s supported')}</Text.Meta>
          </View>
          <View style={[styles.checkBoxView]}>
            <TouchableOpacity
              onPress={() => {
                setRequestVerification(!requestVerification)
                setFieldValue('requestVerificationInd', requestVerification)
              }}
              style={styles.checkBox}
            >
              {requestVerification ? <BlueTick /> : <BlueHollowCircle />}
            </TouchableOpacity>
            <Text.Body style={styles.rowText}>{t('Request verification of completion from school')}</Text.Body>
          </View>
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
