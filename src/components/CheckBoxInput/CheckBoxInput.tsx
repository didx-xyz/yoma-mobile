import { FormikProps } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'

import CheckBox from '../CheckBox'

interface Props extends Omit<React.ComponentProps<typeof CheckBox>, 'isChecked' | 'onPress'> {
  handlers: FormikProps<any>
  name: string
}

const CheckBoxInput = ({ name, handlers, ...props }: Props) => {
  const [isChecked, setIsChecked] = useState(false)

  const handlePress = useCallback(() => {
    setIsChecked(isChecked => !isChecked)
  }, [])

  useEffect(() => {
    if (isChecked !== handlers.values[name]) {
      handlers.setFieldValue(name, isChecked)
    }
  }, [handlers, name, isChecked])

  return <CheckBox {...props} isChecked={isChecked} onPress={handlePress} />
}

export default CheckBoxInput
