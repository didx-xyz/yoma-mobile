import React from 'react'

import { ButtonAdd, ButtonEdit } from '~/components/Button'

interface ActionButtonProps {
  onAction: () => void
  isEditAction: boolean
}
const ActionButton = ({ isEditAction, onAction }: ActionButtonProps) =>
  isEditAction ? <ButtonEdit onPress={onAction} /> : <ButtonAdd onPress={onAction} />

export default ActionButton
