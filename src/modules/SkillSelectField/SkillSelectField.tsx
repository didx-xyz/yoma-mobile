import { useField } from 'formik'
import { concat, of, pipe, uniq } from 'ramda'
import React, { useCallback, useState } from 'react'

import { dropElement } from '~/utils/arrays.utils'

import SkillSelectModal from './SkillSelectModal'
import SkillsInput from './SkillsInput/SkillsInput'

interface Props {
  name: string
  placeholder: string
  skills: string[]
}
const SkillsSelectField = ({ name, placeholder, skills }: Props) => {
  console.log({ component: 'SkillsSelectField' })

  const [{ value }, { touched, error }, { setValue }] = useField(name)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const handleItemSelect = useCallback(
    (skill: string) => {
      const selectedSkills = pipe(of, concat(value), uniq)(skill)
      setValue(selectedSkills)
    },
    [setValue, value],
  )

  const handleDelete = useCallback(
    skill => {
      const selectedSkills = dropElement(skill)(value)
      setValue(selectedSkills)
    },
    [setValue, value],
  )

  const handleOpenModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  /* TODO:
   * [x] 1. Add loading states for 'searching' for skills
   * [?] 2. Add pagination? (or slow load for longer lists - although RN should just handle this itself tbh - make sure we're using the correct list.
   * [x] 3. Initial view should just be the +Add Skills pill, I think.
   * [] 4. TEST ASAP ON AN ACTUAL DEVICE (TO MAKE SURE IT'S PERFORMANT)
   * [x] 5. Fix styling for 'No Results...'
   */
  return (
    <>
      <SkillsInput
        skills={value}
        touched={touched}
        error={error}
        placeholder={placeholder}
        onDelete={handleDelete}
        onAdd={handleOpenModal}
      />
      <SkillSelectModal
        skills={skills}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        handleItemSelect={handleItemSelect}
      />
    </>
  )
}

export default SkillsSelectField
