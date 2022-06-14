import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormikProps } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, View } from 'react-native'

import { ButtonSave } from '~/components/Button'
import DateRangeSelect from '~/components/DateRangeSelect'
import FormGroup from '~/components/FormGroup'
import FormLayout from '~/components/FormLayout'
import Header from '~/components/Header'
import InfoModal from '~/components/InfoModal'
import Input from '~/components/Input'
import Text, { MetaLevels } from '~/components/Typography'
import Upload from '~/components/Upload'
import ViewContainer from '~/components/ViewContainer'
import { types as HomeNavigationTypes } from '~/modules/HomeNavigation'
import SkillsSelectField from '~/modules/SkillSelectField'
import { Colors } from '~/styles'

import styles from './CompletedCoursesForm.styles'

interface Props {
  navigation: NativeStackNavigationProp<
    HomeNavigationTypes.HomeNavigatorParamsList,
    HomeNavigationTypes.HomeNavigationRoutes.Education
  >
  form: FormikProps<any>
}

const CompletedCoursesForm = ({ navigation, form }: Props) => {
  const { t } = useTranslation()
  const [showInfoModal, setShowInfoModal] = useState(false)

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Courses')}
        actionItem={<ButtonSave onPress={form.handleSubmit} />}
      />
      <ScrollView>
        <FormGroup>
          <FormLayout>
            <Input name="title" label={t('Course name')} />
            <Input name="provider" label={t('Course host provider')} />
            <DateRangeSelect />
            <Input name="description" label={t('Description')} multiline />
            <SkillsSelectField name="skillNames" searchPlaceholder={t('Search skills')} label={t('Skills developed')} />
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

export default CompletedCoursesForm
