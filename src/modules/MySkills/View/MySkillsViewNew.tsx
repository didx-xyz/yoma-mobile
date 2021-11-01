import { Formik } from 'formik'
import React from 'react'

import { SkillsFilterField } from '../../Skills'

const MySkillsViewNew = () => {
  return (
    <Formik initialValues={{ skills: [] }} onSubmit={() => {}}>
      {() => <SkillsFilterField name="skills" />}
    </Formik>
  )
}

export default MySkillsViewNew
