import { useField } from 'formik'
import { append, ifElse, includes, without } from 'ramda'
import React, { useCallback, useState } from 'react'

import Modal from '~/components/Modal/Modal'
import { dropElement } from '~/utils/arrays.utils'

import SkillSelector from './SkillSelector'
import SkillsInput from './SkillsInput'

interface Props {
  name: string
  placeholder: string
  skills: string[]
}
const SkillsSelectField = ({ name, placeholder, skills }: Props) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const handleItemSelect = useCallback(
    (skill: string) => {
      const selectedSkills = ifElse(includes(skill), without(skill), append(skill))(value)

      // const selectedSkills = pipe(of, concat(value), uniq)(skill)
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
      <Modal setVisible={setModalOpen} isVisible={isModalOpen}>
        <SkillSelector onItemSelect={handleItemSelect} skills={skills} />
      </Modal>
    </>
  )
}

export default SkillsSelectField
