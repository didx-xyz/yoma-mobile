import { DropDownTags } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { SKILLS_INITIAL_VALUES, MOCK_SKILLS_LIST } from './SkillsForm.constants'
import styles from './SkillsForm.styles'

const SkillsForm = () => {
  const { t } = useTranslation()

  return (
    <Formik initialValues={SKILLS_INITIAL_VALUES} onSubmit={() => {}}>
      {(formikHandlers: FormikProps<FormikValues>) => (
        <View style={styles.form}>
          <DropDownTags
            items={MOCK_SKILLS_LIST}
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

export default SkillsForm
