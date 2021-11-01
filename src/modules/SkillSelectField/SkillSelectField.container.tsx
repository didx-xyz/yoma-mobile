import React from 'react'
import { useSelector } from 'react-redux'

import SkillSelectField from './SkillSelectField'
import selector from './SkillSelectField.selector'

interface Props {
  name: string
}

const SkillSelectFieldContainer = ({ name }: Props) => {
  const skills = useSelector(selector)

  return <SkillSelectField name={name} skills={skills} />
}

export default SkillSelectFieldContainer
