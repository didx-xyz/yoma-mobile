import React from 'react'
import { useSelector } from 'react-redux'

import SkillSelectField from './SkillSelectField'
import selector from './SkillSelectField.selector'

interface Props {
  name: string
  label?: string
  searchPlaceholder?: string
}

const SkillSelectFieldContainer = ({ name, label, searchPlaceholder }: Props) => {
  const skills = useSelector(selector)

  return <SkillSelectField name={name} label={label} searchPlaceholder={searchPlaceholder} skills={skills} />
}

export default SkillSelectFieldContainer
