import React from 'react'

import ListFilter from '~/components/ListFilter/ListFilter'

import SkillsResults from '../SkillsResults'
import { useSkillsFilter } from './SkillSelect.hooks'

interface Props {
  searchPlaceholder?: string
  skills: string[]
  onItemSelect: (skill: string) => void
}

const SkillSelect = ({ searchPlaceholder, skills, onItemSelect }: Props) => {
  const { results, setSearchTerm, hasNoResults } = useSkillsFilter(skills)

  return (
    <>
      <ListFilter searchPlaceholder={searchPlaceholder} setSearchTerm={setSearchTerm} />
      <SkillsResults skills={results} hasNoResults={hasNoResults} onItemSelect={onItemSelect} />
    </>
  )
}
export default SkillSelect
