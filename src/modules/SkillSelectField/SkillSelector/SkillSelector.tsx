import React from 'react'

import SkillsFilter from '../SkillsFilter'
import SkillsResults from '../SkillsResults'
import { useSkillsFilter } from './SkillSelector.hooks'

interface Props {
  onItemSelect: (skill: string) => void
  skills: string[]
}

const SkillSelector = ({ onItemSelect, skills }: Props) => {
  const { isLoading, setIsLoading, results, setSearchTerm, hasNoResults } = useSkillsFilter(skills)

  return (
    <>
      <SkillsFilter setIsLoading={setIsLoading} setSearchTerm={setSearchTerm} />
      <SkillsResults skills={results} hasNoResults={hasNoResults} onItemSelect={onItemSelect} isLoading={isLoading} />
    </>
  )
}
export default SkillSelector
