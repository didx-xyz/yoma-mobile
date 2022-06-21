import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = yup.object().shape({
  biography: yup.string().min(2).max(1000).required(Strings.REQUIRED),
})
