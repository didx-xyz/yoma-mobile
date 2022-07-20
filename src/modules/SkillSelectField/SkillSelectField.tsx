import { useField } from 'formik'
import { without } from 'ramda'
import React, { useCallback, useState } from 'react'

import Modal from '~/components/Modal'
import { withoutElseAppend } from '~/utils/arrays.utils'

import SkillSelector from './SkillSelector'
import SkillsInput from './SkillsInput'

interface Props {
  name: string
  label?: string
  searchPlaceholder?: string
  skills: string[]
}
const SkillsSelectField = ({ name, label, searchPlaceholder, skills }: Props) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const handleItemSelect = useCallback(
    (skill: string) => {
      const selectedSkills = withoutElseAppend(skill)(value)
      setValue(selectedSkills)
    },
    [setValue, value],
  )

  const handleDelete = useCallback(
    (skill: string) => {
      const selectedSkills = without(skill)(value)
      setValue(selectedSkills)
    },
    [setValue, value],
  )

  const handleOpenModal = useCallback(() => {
    setModalOpen(true)
  }, [])

  return (
    <>
      <SkillsInput
        skills={value}
        touched={touched}
        error={error}
        label={label}
        onDelete={handleDelete}
        onAdd={handleOpenModal}
      />
      <Modal setVisible={setModalOpen} isVisible={isModalOpen}>
        <SkillSelector searchPlaceholder={searchPlaceholder} onItemSelect={handleItemSelect} skills={skills} />
      </Modal>
    </>
  )
}

export default SkillsSelectField
