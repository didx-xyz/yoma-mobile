import * as Yup from 'yup'

export const schema = Yup.object().shape({
  skills: Yup.array().of(Yup.string()).min(0).nullable().required('Required'),
})
