import { DropDownTags } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { MOCK_USER_SKILLS_LIST, USER_SKILLS_INITIAL_VALUES } from './MySkillsForm.constants'
import styles from './MySkillsForm.styles'

const MySkillsForm = () => {
  const { t } = useTranslation()

  return (
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
  )
}

export default MySkillsForm
