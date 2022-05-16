import React from 'react'
import { useSelector } from 'react-redux'

import SkillSelectField from './SkillSelectField'
import selector from './SkillSelectField.selector'

interface Props {
  name: string
  placeholder: string
}

const SkillSelectFieldContainer = ({ name, placeholder }: Props) => {
  const skills = useSelector(selector)

  return <SkillSelectField name={name} placeholder={placeholder} skills={skills} />
}

export default SkillSelectFieldContainer
