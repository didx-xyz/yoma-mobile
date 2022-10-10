import { useField } from 'formik'
import { without } from 'ramda'
import React, { useCallback, useState } from 'react'

import Modal from '~/components/Modal'
import { concatUnique } from '~/utils/arrays.utils'

import SkillSelect from './SkillSelect'
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
  const [internalSkills, setInternalSkills] = useState<string[]>([])

  const handleItemSelect = useCallback((skill: string) => {
    setInternalSkills((prevState: string[]) => [...prevState, skill])
  }, [])

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

  const onModalClose = useCallback(
    (visibility: boolean) => {
      if (!visibility) {
        const updatedValue = concatUnique(internalSkills, value)
        setValue(updatedValue)
      }
    },
    [internalSkills, setValue, value],
  )

  const handleSetVisible = useCallback(
    (visibility: boolean) => {
      onModalClose(visibility)
      setModalOpen(visibility)
    },
    [onModalClose],
  )

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
      <Modal setVisible={handleSetVisible} isVisible={isModalOpen}>
        <SkillSelect searchPlaceholder={searchPlaceholder} onItemSelect={handleItemSelect} skills={skills} />
      </Modal>
    </>
  )
}

export default SkillsSelectField
