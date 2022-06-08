import React from 'react'

import SkillsFilter from '../SkillsFilter'
import SkillsResults from '../SkillsResults'
import { useSkillsFilter } from './SkillSelector.hooks'

interface Props {
  searchPlaceholder?: string
  skills: string[]
  onItemSelect: (skill: string) => void
}

const SkillSelector = ({ searchPlaceholder, skills, onItemSelect }: Props) => {
  const { isLoading, setIsLoading, results, setSearchTerm, hasNoResults } = useSkillsFilter(skills)

  return (
    <>
      <SkillsFilter searchPlaceholder={searchPlaceholder} setIsLoading={setIsLoading} setSearchTerm={setSearchTerm} />
      <SkillsResults skills={results} hasNoResults={hasNoResults} onItemSelect={onItemSelect} isLoading={isLoading} />
    </>
  )
}
export default SkillSelector
