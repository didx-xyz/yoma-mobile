import { TFunction } from 'i18next'
import * as yup from 'yup'

export const schema = (t: TFunction) =>
  yup.object().shape({
    email: yup
      .string()
      .min(2, t('emailError'))
      .max(255)
      .email(t('validEmailError'))
      .required(t('required'))
      .label('Email'),
    password: yup.string().min(8, t('passwordMinCharError')).required(t('required')).label('Password'),
  })
