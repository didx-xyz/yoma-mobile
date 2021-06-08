import { Spinner, DatePicker, DropDownTags, InfoModal, Upload, Input, CheckBox, FormWrapper } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Colors } from 'styles'

import { INITIAL_VALUES, MOCKED_SKILLS_DATA } from './EducationForm.constants'
import styles from './EducationForm.styles'
import ValidationSchema from './ValidationSchema'

const EducationForm = forwardRef(ref => {
  const { t } = useTranslation()
  const [isStudying, setIsStudying] = useState(false)
  const [skillsList] = useState(MOCKED_SKILLS_DATA)
  const [showInfoModal, setShowInfoModal] = useState(false)

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
      // @ts-ignore
      // TODO - we will refactor this when we get everything working
      innerRef={formRef}
      initialValues={INITIAL_VALUES}
      enableReinitialize={true}
      validationSchema={ValidationSchema}
      onSubmit={() => {}}
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
          <Spinner visible={formikHandlers.isSubmitting} />
          <Input name={'school'} label={t('School')} handlers={formikHandlers} />
          <Input name={'qualificationType'} label={t('Qualification type')} handlers={formikHandlers} />
          <Input name={'country'} label={t('Country or region')} handlers={formikHandlers} />
          <CheckBox
            isChecked={isStudying}
            label={t('I currently study here')}
            onPress={() => setIsStudying(!isStudying)}
          />
          <View style={styles.row}>
            <DatePicker name={'startDate'} label={t('Start date')} handlers={formikHandlers} />
            <DatePicker name={'endDate'} label={t('End date')} handlers={formikHandlers} />
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
          <View style={styles.bottom}>
            <Text.Meta
              level={MetaLevels.smallBold}
              color={Colors.primaryGreen}
              style={styles.bottomText}
              onPress={() => setShowInfoModal(true)}
            >
              {t('Find inspiration on how to write a great education description.')}
            </Text.Meta>
          </View>
        </FormWrapper>
      )}
    </Formik>
  )
})

export default EducationForm
