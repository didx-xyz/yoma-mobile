import { useField } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'

import CheckBoxLabelled from '../CheckBoxLabelled'

interface Props extends Omit<React.ComponentProps<typeof CheckBoxLabelled>, 'isSelected' | 'onPress'> {
  name: string
}

const CheckBoxInput = ({ name, ...props }: Props) => {
  const [isSelected, setIsSelected] = useState(false)
  const [, { value }, { setValue }] = useField(name)

  const handlePress = useCallback(() => {
    setIsSelected(prevState => !prevState)
  }, [])

  useEffect(() => {
    if (isSelected !== value) {
      setValue(isSelected)
    }
  }, [isSelected, setValue, value])

  return <CheckBoxLabelled {...props} isSelected={isSelected} onPress={handlePress} />
}

export default CheckBoxInput
