import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { ButtonSave } from '~/components/Button'
import DateRangeSelect from '~/components/DateRangeSelect'
import DropDown, { types as DropDownTypes } from '~/components/DropDown'
import FormGroup from '~/components/FormGroup'
import Header from '~/components/Header'
import InfoModal from '~/components/InfoModal'
import Input from '~/components/Input'
import Text, { MetaLevels } from '~/components/Typography'
import Upload from '~/components/Upload'
import ViewContainer from '~/components/ViewContainer'
import { CompletedCoursesNavigation } from '~/modules/CompletedCourses/types'
import CountrySelectField from '~/modules/CountrySelectField/CountrySelectField.container'
import { EducationNavigation } from '~/modules/Education/types'
import SkillsSelectField from '~/modules/SkillSelectField'
import { Colors } from '~/styles'

import styles from './UserQualificationsForm.styles'

interface Props {
  navigation: EducationNavigation | CompletedCoursesNavigation
  organisationsDropDown: DropDownTypes.DropDownItem[]
  title: string
  form: FormikProps<any>
}

const UserQualificationsForm = ({ title, navigation, organisationsDropDown, form }: Props) => {
  const { t } = useTranslation()
  const [showInfoModal, setShowInfoModal] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText={title} actionItem={<ButtonSave onPress={form.handleSubmit} />} />
      <ScrollView>
        <FormGroup>
          <Input name="title" label={t('Qualification')} />
          <Input name="description" label={t('Description')} multiline />
          <DropDown
            items={organisationsDropDown}
            searchPlaceholder={t('Search organisations')}
            label={t('School or Educational institution')}
            name="organisationId"
          />
          <CountrySelectField
            name="countries"
            label={t('Country')}
            searchPlaceholder={t('Filter countries')}
            modalHeader={t('Select qualification country')}
          />
          <DateRangeSelect />
          <SkillsSelectField name="skillNames" searchPlaceholder={t('Search skills')} label={t('forms.label.skills')} />
          <Upload name="certificate" label={t('Upload certification (if completed)')} />
          <View style={styles.bottom}>
            <Text.Meta
              level={MetaLevels.SmallBold}
              color={Colors.PrimaryGreen}
              style={styles.bottomText}
              onPress={() => setShowInfoModal(true)}
            >
              {t('Find inspiration on how to write a great education description.')}
            </Text.Meta>
            <InfoModal
              visible={showInfoModal}
              closeModal={() => setShowInfoModal(false)}
              infoText={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
              }
            />
          </View>
        </FormGroup>
      </ScrollView>
    </ViewContainer>
  )
}

export default UserQualificationsForm
