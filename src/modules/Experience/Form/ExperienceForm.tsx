import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity } from 'react-native'

import Card from '../../../components/Card'
import CheckBox from '../../../components/CheckBox'
import DateRangeSelect from '../../../components/DateRangeSelect'
import DropDown, { types as DropDownTypes } from '../../../components/DropDown'
import DropDownTags from '../../../components/DropDownTags'
import FormLayout from '../../../components/FormLayout'
import Header from '../../../components/Header'
import InfoModal from '../../../components/InfoModal'
import Input from '../../../components/Input'
import Text, { MetaLevels } from '../../../components/Typography'
import ViewContainer from '../../../components/ViewContainer'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import styles from './ExperienceForm.styles'

interface Props {
  onFilterSkills: (value: string) => void
  skills: DropDownTypes.DropDownItem[]
  organisations: DropDownTypes.DropDownItem[]
  form: FormikProps<any>
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Experience>
}

const ExperienceForm = ({ navigation, skills, organisations, onFilterSkills, form }: Props) => {
  const { t } = useTranslation()
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText={t('Experience')} onSave={form.handleSubmit} isSaveButtonEnabled />
      <ScrollView>
        <Card>
          <FormLayout>
            <InfoModal
              visible={showInfoModal}
              closeModal={() => setShowInfoModal(false)}
              infoText={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
              }
            />
            <Input name={'title'} label={t('Title')} handlers={form} />
            <DropDown
              items={organisations}
              name={'organisationId'}
              label={'Company name'}
              searchable
              searchPlaceholder={t('Search organisation')}
            />
            <CheckBox
              isChecked={isWorkingHere}
              label={t('I currently work here')}
              onPress={() => setIsWorkingHere(!isWorkingHere)}
            />
            <DateRangeSelect label={t('When did you work here?')} />
            <Input name={'description'} label={t('Description')} handlers={form} multiline />
            <DropDownTags
              items={skills}
              multiple
              searchable
              searchPlaceholder={t('Search skills')}
              onChangeSearchText={onFilterSkills}
              label={t('Skills developed')}
              name={'skillNames'}
              handlers={form}
            />
            <TouchableOpacity onPress={() => setShowInfoModal(true)}>
              <Text.Meta level={MetaLevels.SmallBold} color={Colors.PrimaryGreen}>
                {t('Find inspiration on how to write a great profile.')}
              </Text.Meta>
            </TouchableOpacity>
          </FormLayout>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default ExperienceForm
