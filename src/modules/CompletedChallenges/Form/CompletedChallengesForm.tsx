import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { IconInfo } from '../../../assets/images'
import Card from '../../../components/Card'
import CheckBox from '../../../components/CheckBox'
import DatePicker from '../../../components/DatePicker'
import DropDown from '../../../components/DropDown'
import DropDownTags from '../../../components/DropDownTags'
import FormWrapper from '../../../components/FormWrapper'
import Header from '../../../components/Header'
import Input from '../../../components/Input'
import Upload from '../../../components/Upload'
import ViewContainer from '../../../components/ViewContainer'
import { types as ChallengeTypes } from '../../Challenges'
import { types as HomeNavigationTypes } from '../../HomeNavigation'
import { types as UserChallengesTypes } from '../../UserChallenges'
import { INITIAL_FORM_VALUES, MOCK_SKILLS } from '../CompletedChallenges.constants'
import styles from './CompletedChallengesForm.styles'

interface Props {
  challenges: ChallengeTypes.NormalisedChallenges
  onSubmit: (values: UserChallengesTypes.UserChallengeFormFields) => void
  navigation: StackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.CompletedChallenges
  >
}

const CompletedChallengesForm = ({ navigation, onSubmit }: Props) => {
  const { t } = useTranslation()
  const [isInProgress, setIsInProgress] = useState(false)
  const [skillsList] = useState(MOCK_SKILLS)
  const [shouldRequestVerification, setShouldRequestVerification] = useState<boolean>(false)

  return (
    <Formik initialValues={INITIAL_FORM_VALUES} onSubmit={onSubmit}>
      {formikHandlers => (
        <ViewContainer style={styles.container}>
          <Header
            navigation={navigation}
            onSave={() => {
              console.log('saving...')
              formikHandlers.handleSubmit()
            }}
            headerText={t('Add challenge')}
            showAddButton={false}
            isSaveButtonEnabled
          />
          <ScrollView>
            <Card>
              <FormWrapper>
                <DropDown name="challenge" label={t('Challenge')} items={[]} handlers={formikHandlers} />
                <Input name="challengeHostProvider" label={t('Challenge host provider')} handlers={formikHandlers} />
                <CheckBox
                  isChecked={isInProgress}
                  label={t('Challenge is currently in progress')}
                  onPress={() => setIsInProgress(!isInProgress)}
                />
                <View style={styles.row}>
                  <DatePicker name="startDate" label={t('Start date')} handlers={formikHandlers} />
                  <DatePicker name="endDate" label={t('End date')} handlers={formikHandlers} />
                </View>
                <Input name="description" label={t('description')} handlers={formikHandlers} multiline />
                <DropDownTags
                  items={skillsList}
                  multiple
                  searchPlaceholder={t('Search skills')}
                  label={t('Skills developed')}
                  name="skillNames"
                  handlers={formikHandlers}
                />
                <Upload onPress={() => {}} />
                <View style={styles.checkBoxRow}>
                  <CheckBox
                    isChecked={shouldRequestVerification}
                    label={t('Request verification of employment from company')}
                    onPress={() => setShouldRequestVerification(!shouldRequestVerification)}
                  />
                  <View style={styles.iconInfo}>
                    <IconInfo />
                  </View>
                </View>
              </FormWrapper>
            </Card>
          </ScrollView>
        </ViewContainer>
      )}
    </Formik>
  )
}

export default CompletedChallengesForm
