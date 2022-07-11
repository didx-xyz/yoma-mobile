import i18n from 'i18next'
import * as Yup from 'yup'

export const schema = Yup.object().shape({
  skills: Yup.array().of(Yup.string()).min(0).nullable().required(i18n.t('forms.validation.required')),
})
