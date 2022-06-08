import React from 'react'

import { WithChildren } from '../../types/react.types'
import Card from '../Card'
import FormLayout from '../FormLayout'

type Props = WithChildren<{}>

const FormGroup = ({ children }: Props) => (
  <Card>
    <FormLayout>{children}</FormLayout>
  </Card>
)

export default FormGroup
