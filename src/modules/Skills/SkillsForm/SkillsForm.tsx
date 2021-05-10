import { DropDownTags } from 'components'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { INITIAL_VALUES, MOCK_SKILLS_LIST } from './SkillsForm.constants'
import styles from './SkillsForm.styles'

const SkillsForm = () => {
  const { t } = useTranslation()
  const [skillsList, setSkills] = useState(MOCK_SKILLS_LIST)

  return (
    <Formik initialValues={INITIAL_VALUES}>
      {(formikHandlers: FormikProps<FormikValues>) => (
        <View style={styles.form}>
          <DropDownTags
            items={skillsList}
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
