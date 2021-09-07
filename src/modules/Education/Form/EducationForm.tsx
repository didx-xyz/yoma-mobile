import { StackNavigationProp } from '@react-navigation/stack'
import { CheckBox, DatePicker, DropDownTags, FormWrapper, InfoModal, Input, Spinner, Upload } from 'components'
import Text, { MetaLevels } from 'components/Typography'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'
import { Colors } from 'styles'
import { getHasValuesChanged } from 'utils/form.utils'

import Card from '../../../components/Card'
import Header from '../../../components/Header'
import ViewContainer from '../../../components/ViewContainer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import ValidationSchema from './Education.validationSchema'
import { INITIAL_VALUES, MOCKED_SKILLS_DATA } from './EducationForm.constants'
import styles from './EducationForm.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
}

const EducationForm = forwardRef(({ navigation }: Props, ref) => {
  const { t } = useTranslation()
  const [isStudying, setIsStudying] = useState(false)
  const [skillsList] = useState(MOCKED_SKILLS_DATA)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false)

  const toggleSaveButtonState = (hasFormChanged: boolean) => {
    setIsSaveButtonActive(hasFormChanged)
  }

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

  const validation = () => {
    setTimeout(() => {
      const hasFormChanged = getHasValuesChanged(
        formRef.current!.initialValues,
        formRef.current!.values,
        formRef.current!.isValid,
      )
      toggleSaveButtonState(hasFormChanged)
    }, 10)
  }

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Education')}
        isSaveButtonEnabled={isSaveButtonActive}
        onSave={() => formRef.current?.handleSubmit()}
        showAddButton={false}
      />
      <ScrollView>
        <Card>
          <Formik
            // @ts-ignore
            // TODO - we will refactor this when we get everything working
            innerRef={formRef}
            initialValues={INITIAL_VALUES}
            enableReinitialize
            validate={validation}
            validationSchema={ValidationSchema}
            validateOnChange
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
                    level={MetaLevels.SmallBold}
                    color={Colors.PrimaryGreen}
                    style={styles.bottomText}
                    onPress={() => setShowInfoModal(true)}
                  >
                    {t('Find inspiration on how to write a great education description.')}
                  </Text.Meta>
                </View>
              </FormWrapper>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
})

export default EducationForm
