import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, TouchableOpacity } from 'react-native'

import { ButtonSave } from '~/components/Button'
import Card from '~/components/Card'
import CheckBoxLabelled from '~/components/CheckBoxLabelled'
import DateRangeSelect from '~/components/DateRangeSelect'
import DropDown, { types as DropDownTypes } from '~/components/DropDown'
import FormLayout from '~/components/FormLayout'
import Header from '~/components/Header'
import InfoModal from '~/components/InfoModal'
import Input from '~/components/Input'
import Text, { MetaLevels } from '~/components/Typography'
import ViewContainer from '~/components/ViewContainer'
import SkillsSelectField from '~/modules/SkillSelectField'
import { Colors } from '~/styles'

import styles from './ExperienceForm.styles'
import { ExperienceFormNavigation } from './ExperienceForm.types'

interface Props {
  organisations: DropDownTypes.DropDownItem[]
  form: FormikProps<any>
  navigation: ExperienceFormNavigation
}

const ExperienceForm = ({ navigation, organisations, form }: Props) => {
  const { t } = useTranslation()
  const [isWorkingHere, setIsWorkingHere] = useState<boolean>(false)
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false)

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Experience')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
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
            <Input name={'title'} label={t('Title')} />
            <DropDown
              items={organisations}
              name={'organisationId'}
              label={t('Company name')}
              searchable
              searchPlaceholder={t('Search organisation')}
            />
            <CheckBoxLabelled
              isSelected={isWorkingHere}
              label={t('I currently work here')}
              onPress={() => setIsWorkingHere(!isWorkingHere)}
            />
            <DateRangeSelect label={t('When did you work here?')} />
            <Input name={'description'} label={t('Description')} multiline />
            <SkillsSelectField
              name="skillNames"
              searchPlaceholder={t('Search skills')}
              label={t('forms.label.skills')}
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
