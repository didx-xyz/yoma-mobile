import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import { evolve } from 'ramda'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity, View } from 'react-native'

import Card from '../../../components/Card'
import CheckBox from '../../../components/CheckBox'
import DatePicker from '../../../components/DatePicker'
import DropDown, { types as DropDownTypes } from '../../../components/DropDown'
import DropDownTags from '../../../components/DropDownTags'
import FormLayout from '../../../components/FormLayout'
import Header from '../../../components/Header'
import InfoModal from '../../../components/InfoModal'
import Input from '../../../components/Input'
import Text, { MetaLevels } from '../../../components/Typography'
import ViewContainer from '../../../components/ViewContainer'
import { Colors } from '../../../styles'
import { dateToISOString } from '../../../utils/dates.utils'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { types as UserJobsTypes } from '../../UserJobs'
import { INITIAL_VALUES } from './ExperienceForm.constants'
import styles from './ExperienceForm.styles'
import { ValidationSchema } from './ExperienceForm.validationSchema'

interface Props {
  onFilterSkills: (value: string) => void
  onJobCreate: (job: any) => void
  skills: DropDownTypes.DropDownItem[]
  organisations: DropDownTypes.DropDownItem[]
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const ExperienceForm = ({ navigation, skills, organisations, onFilterSkills, onJobCreate }: Props) => {
  const { t } = useTranslation()
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)
  const [formState, setFormState] = useState<UserJobsTypes.UserJobsFormState>({ isValid: true, values: INITIAL_VALUES })

  const handleUserJobsFormSave = useCallback(() => {
    const values = evolve({
      startTime: dateToISOString,
      endTime: dateToISOString,
    })(formState.values)
    onJobCreate(values)
  }, [formState.values, onJobCreate])

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Experience')}
        onSave={handleUserJobsFormSave}
        isSaveButtonEnabled={formState?.isValid}
      />
      <ScrollView>
        <Card>
          <Formik
            initialValues={formState?.values}
            enableReinitialize
            validateOnMount
            validationSchema={ValidationSchema}
            validate={values => {
              ValidationSchema()
                .isValid(values)
                .then(isValid => {
                  setFormState({ values, isValid })
                })
            }}
            onSubmit={() => {}}
          >
            {(formikHandlers: any) => (
              <FormLayout>
                <InfoModal
                  visible={showInfoModal}
                  closeModal={() => setShowInfoModal(false)}
                  infoText={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
                  }
                />
                {/* <Spinner visible={formikHandlers.isSubmitting} /> */}
                <Input name={'title'} label={t('Title')} handlers={formikHandlers} />
                <DropDown
                  items={organisations}
                  name={'organisationId'}
                  label={'Company name'}
                  handlers={formikHandlers}
                  searchable
                  searchPlaceholder={t('Search organisation')}
                />
                <CheckBox
                  isChecked={isWorkingHere}
                  label={t('I currently work here')}
                  onPress={() => setIsWorkingHere(!isWorkingHere)}
                />
                <View style={styles.row}>
                  <DatePicker name="startTime" label={t('Start date')} handlers={formikHandlers} />
                  <DatePicker name="endTime" label={t('End date')} handlers={formikHandlers} />
                </View>
                <Input name={'description'} label={t('Description')} handlers={formikHandlers} multiline />
                <DropDownTags
                  items={skills}
                  multiple
                  searchable
                  searchPlaceholder={t('Search skills')}
                  onChangeSearchText={onFilterSkills}
                  label={t('Skills developed')}
                  name={'skillNames'}
                  handlers={formikHandlers}
                />
                <TouchableOpacity onPress={() => setShowInfoModal(true)}>
                  <Text.Meta level={MetaLevels.SmallBold} color={Colors.PrimaryGreen}>
                    {t('Find inspiration on how to write a great profile.')}
                  </Text.Meta>
                </TouchableOpacity>
              </FormLayout>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default ExperienceForm
