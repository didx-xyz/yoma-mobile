import * as Yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = Yup.object().shape({
  skills: Yup.array().of(Yup.string()).min(0).nullable().required(Strings.REQUIRED),
})
