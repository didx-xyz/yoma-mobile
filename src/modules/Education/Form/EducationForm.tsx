import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { DropDownTags, FormLayout, InfoModal, Input, Spinner } from '../../../components'
import { ButtonSave } from '../../../components/Button'
import Card from '../../../components/Card'
import DateRangeSelect from '../../../components/DateRangeSelect'
import DropDown from '../../../components/DropDown'
import Header from '../../../components/Header'
import Text, { MetaLevels } from '../../../components/Typography'
import Upload from '../../../components/Upload'
import ViewContainer from '../../../components/ViewContainer'
import { Colors } from '../../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import styles from './EducationForm.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Education>
  skillsDropDown: any
  organisationsDropDown: any
  form: any
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
        <Card>
          <FormLayout>
            <InfoModal
              visible={showInfoModal}
              closeModal={() => setShowInfoModal(false)}
              infoText={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis mauris purus. Quisque malesuada ornare mauris sed feugiat. Cras lectus est, iaculis quis nulla cursus, finibus gravida massa. Donec condimentum porta nisi, eu egestas risus ullamcorper in. In et magna mauris. '
              }
            />
            <Spinner visible={form.isSubmitting} />
            <Input name={'school'} label={t('School')} handlers={form} />
            <Input name={'qualificationType'} label={t('Qualification type')} handlers={form} />
            <Input name={'country'} label={t('Country or region')} handlers={form} />
            <DateRangeSelect label={t('When did you do the course?')} />
            <Input name={'description'} label={t('Description')} handlers={form} multiline />
            <DropDownTags
              items={skillsDropDown}
              multiple
              searchPlaceholder={t('Search skills')}
              label={t('Skills developed')}
              name={'skillNames'}
            />
            <DropDown
              items={organisationsDropDown}
              multiple
              searchPlaceholder={t('Search organisations')}
              label={t('Educational institution')}
              name={'organisationId'}
            />
            <Upload name="upload" label={t('Upload certification (if completed)')} />
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
          </FormLayout>
        </Card>
      </ScrollView>
    </ViewContainer>
  )
}

export default EducationForm
