import { StackNavigationProp } from '@react-navigation/stack'
import { DatePicker, DropDownTags, InfoModal, Upload, Input, CheckBox, FormWrapper } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { Formik, FormikProps, FormikValues } from 'formik'
import { NavigationRoutes } from 'modules/Home/Home.routes'
import { HomeNavigatorParamsList } from 'modules/Home/Home.types'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, View } from 'react-native'
import { Colors } from 'styles'
import { compareFormikObject } from 'utils/strings.utils'

import { INITIAL_VALUES, MOCKED_SKILLS_DATA } from './EducationForm.constants'
import styles from './EducationForm.styles'
import ValidationSchema from './ValidationSchema'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, NavigationRoutes.Education>
  changeButtonState: (value: boolean) => void
}

const EducationForm = forwardRef(({ navigation, changeButtonState }: Props, ref) => {
  const { t } = useTranslation()
  const [isStudying, setIsStudying] = useState(false)
  const [skillsList, setSkillsList] = useState(MOCKED_SKILLS_DATA)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const formRef = useRef<FormikProps<FormikValues>>()

  useImperativeHandle(ref, () => ({
    handleSubmit() {
      if (formRef.current) {
        formRef.current.handleSubmit()
      }
    },
  }))

  const validation = () => {
    // console.log(formRef.current?.errors)
    // if (equals(INITIAL_VALUES, data) || !formRef.current?.isValid) {
    //   console.log('val')
    //   changeButtonState(false)
    // } else {
    //   changeButtonState(true)
    // }
    const value = compareFormikObject(formRef.current!)
    changeButtonState(value)
  }

  return (
    <Formik
      innerRef={formRef}
      initialValues={INITIAL_VALUES}
      enableReinitialize={true}
      validate={validation}
      validationSchema={ValidationSchema}
    >
      {formikHandlers => (
        <FormWrapper>
          <InfoModal
            visible={showInfoModal}
            closeModal={() => setShowInfoModal(false)}
            infoText={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
            }
          />
          <Input name={'school'} label={t('School')} handlers={formikHandlers} />
          <Input name={'qualificationType'} label={t('Qualification type')} handlers={formikHandlers} />
          <Input name={'country'} label={t('Country or region')} handlers={formikHandlers} />
          <CheckBox
            isChecked={isStudying}
            label={t('I currently study here')}
            onPress={() => setIsStudying(!isStudying)}
          />
          <View style={styles.row}>
            <DatePicker
              onDateChange={(dateString: string, date: Date) => {
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
              onDateChange={(dateString: string, date: Date) => {
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
          <TouchableOpacity onPress={() => setShowInfoModal(true)} style={styles.bottom}>
            <Text.Meta level={MetaLevels.smallBold} color={Colors.primaryGreen} style={styles.bottomText}>
              {t('Find inspiration on how to write a great education description.')}
            </Text.Meta>
          </TouchableOpacity>
        </FormWrapper>
      )}
    </Formik>
  )
})

export default EducationForm
