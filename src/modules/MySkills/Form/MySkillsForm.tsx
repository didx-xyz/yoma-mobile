import { StackNavigationProp } from '@react-navigation/stack'
import { Card, DropDownTags, ViewContainer } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { ButtonSave } from '../../../components/Button'
import Header from '../../../components/Header'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../../HomeNavigation/HomeNavigation.types'
import { MOCK_USER_SKILLS_LIST, USER_SKILLS_INITIAL_VALUES } from './MySkillsForm.constants'
import styles from './MySkillsForm.styles'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.MySkills>
}
const MySkillsForm = ({ navigation }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <Header navigation={navigation} headerText={t('Add skill')} actionItem={<ButtonSave onPress={() => {}} />} />
      <Card>
        <Formik initialValues={USER_SKILLS_INITIAL_VALUES} onSubmit={() => {}}>
          {(formikHandlers: FormikProps<FormikValues>) => (
            <View style={styles.form}>
              <DropDownTags
                items={MOCK_USER_SKILLS_LIST}
                multiple
                searchPlaceholder={t('Search skills')}
                label={t('Skills developed')}
                placeholder={t('Start typing to view suggestions')}
                name={'skillNames'}
                handlers={formikHandlers}
              />
            </View>
          )}
        </Formik>
      </Card>
    </ViewContainer>
  )
}

export default MySkillsForm
