import { BlueHollowCircle, BlueTick, IconInfo } from 'assets/images'
import { CustomInput, Spinner, DatePicker, DropDownTags, Upload, Optional } from 'components'
import Text from 'components/Typography'
import { Formik } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'

import { INITIAL_VALUES } from './NewChallengeForm.constants'
import styles from './NewChallengeForm.styles'

interface Props {
  navigation: any
}

const NewChallengeForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [present, setPresent] = useState(false)
  // TODO: Adding static data to complete the UI
  const [skillsList, setSkillsList] = useState([
    { label: 'UI', value: 'UI' },
    { label: 'Design', value: 'Design' },
    { label: 'UX', value: 'UX' },
  ])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [requestVerification, setRequestVerification] = useState<boolean>(false)
  const formRef = useRef<any>()

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
        <View style={styles.formView}>
          <Spinner visible={isSubmitting} />
          <CustomInput
            onChangeText={handleChange('challenge')}
            onBlur={handleBlur('challenge')}
            value={values.challenge}
            label={t('Challenge')}
            touched={touched.challenge}
            error={errors.challenge}
            showTitle={values.challenge !== ''}
          />
          <CustomInput
            onChangeText={handleChange('challengeHostProvider')}
            onBlur={handleBlur('challengeHostProvider')}
            value={values.challengeHostProvider}
            label={t('Challenge host provider')}
            touched={touched.challengeHostProvider}
            error={errors.challengeHostProvider}
            showTitle={values.challengeHostProvider !== ''}
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
            <Text.Body color={Colors.menuGrey}>{t('Challenge is currently in progress')}</Text.Body>
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
          <View style={styles.checkBoxView}>
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
