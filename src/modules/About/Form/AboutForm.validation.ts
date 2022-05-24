import * as yup from 'yup'

export const schema = yup.object().shape({
  biography: yup.string().min(2).max(1000).required('Required'),
})
