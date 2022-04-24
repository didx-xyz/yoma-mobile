import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { DropDownTags, FormLayout, InfoModal } from '~/components'
import { ButtonSave } from '~/components/Button'
import DateRangeSelect from '~/components/DateRangeSelect'
import DropDown from '~/components/DropDown'
import { types as DropDownTypes } from '~/components/DropDown'
import FormGroup from '~/components/FormGroup'
import Header from '~/components/Header'
import Input from '~/components/Input'
import Text, { MetaLevels } from '~/components/Typography'
import Upload from '~/components/Upload'
import ViewContainer from '~/components/ViewContainer'
import { Colors } from '~/styles'

import CountryPickerField from '../../../components/CountryPickerField'
import { types as HomeNavigationTypes } from '../../HomeNavigation'
import styles from './EducationForm.styles'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.Education
  >
  skillsDropDown: DropDownTypes.DropDownItem[]
  organisationsDropDown: DropDownTypes.DropDownItem[]
  form: FormikProps<any>
}

const EducationForm = ({ navigation, skillsDropDown, organisationsDropDown, form }: Props) => {
  const { t } = useTranslation()
  const [showInfoModal, setShowInfoModal] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Education')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <ScrollView>
        <FormGroup>
          <FormLayout>
            <Input name="title" label={t('Qualification')} />
            <Input name="description" label={t('Description')} multiline />
            <DropDown
              items={organisationsDropDown}
              searchPlaceholder={t('Search organisations')}
              label={t('School or Educational institution')}
              name="organisationId"
            />
            <CountryPickerField name="countries" label={t('Country')} />
            <DateRangeSelect />
            <DropDownTags
              items={skillsDropDown}
              multiple
              searchPlaceholder={t('Search skills')}
              label={t('Skills developed')}
              name="skillNames"
            />
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
          </FormLayout>
        </FormGroup>
      </ScrollView>
    </ViewContainer>
  )
}

export default EducationForm
