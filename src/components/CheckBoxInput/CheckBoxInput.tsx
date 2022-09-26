import { useField } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'

import CheckBox from '../CheckBox'

interface Props extends Omit<React.ComponentProps<typeof CheckBox>, 'isChecked' | 'onPress'> {
  name: string
}

const CheckBoxInput = ({ name, ...props }: Props) => {
  const [isChecked, setIsChecked] = useState(false)
  const [, { value }, { setValue }] = useField(name)

  const handlePress = useCallback(() => {
    setIsChecked(prevState => !prevState)
  }, [])

  useEffect(() => {
    if (isChecked !== value) {
      setValue(isChecked)
    }
  }, [isChecked, setValue, value])

  return <CheckBox {...props} isChecked={isChecked} onPress={handlePress} />
}

export default CheckBoxInput
