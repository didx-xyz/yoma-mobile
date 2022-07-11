import i18n from 'i18next'
import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'
import { nameHasDigitsOrSymbols } from '~/utils/regex'

const PHONE_NUMBER_REGEX = /^[+]?(\([\s\d]+\))?(-?\s?\d)+$/

export const schema = () =>
  yup.object().shape({
    firstName: yup
      .string()
      .min(2)
      .max(50)
      .required(i18n.t('forms.validation.required'))
      .test('First name', i18n.t(Strings.FIRST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS), value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('First name'),
    lastName: yup
      .string()
      .min(2)
      .max(50)
      .required(i18n.t('forms.validation.required'))
      .test('Last name', i18n.t(Strings.LAST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS), value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('Last name'),
    countryAlpha2: yup.string().required(i18n.t('forms.validation.required')).label('Country'),
    email: yup
      .string()
      .min(2, i18n.t('emailError'))
      .max(255)
      .email(i18n.t('validEmailError'))
      .required(i18n.t('forms.validation.required'))
      .label('Email'),
    phoneNumber: yup
      .string()
      .min(10, i18n.t(Strings.THE_VALUE_ENTERED_IS_TOO_SHORT))
      .max(20, i18n.t(Strings.THE_VALUE_ENTERED_IS_TOO_LONG))
      .matches(PHONE_NUMBER_REGEX, i18n.t(Strings.PHONE_NUMBER_IS_NOT_VALID))
      .nullable()
      .required(i18n.t('forms.validation.required'))
      .label('Phone'),
  })
