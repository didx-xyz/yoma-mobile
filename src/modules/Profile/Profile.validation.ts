import i18n from 'i18next'
import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'
import {
  FIRST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS,
  LAST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS,
  PHONE_NUMBER_IS_NOT_VALID,
} from '~/modules/Profile/Profile.constants'
import { nameHasDigitsOrSymbols } from '~/utils/regex'

const PHONE_NUMBER_REGEX = /^[+]?(\([\s\d]+\))?(-?\s?\d)+$/

export const schema = () =>
  yup.object().shape({
    firstName: yup
      .string()
      .min(2)
      .max(50)
      .required(i18n.t(Strings.REQUIRED))
      .test('First name', FIRST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS, value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('First name'),
    lastName: yup
      .string()
      .min(2)
      .max(50)
      .required(i18n.t(Strings.REQUIRED))
      .test('Last name', LAST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS, value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('Last name'),
    countryAlpha2: yup.string().required(i18n.t(Strings.REQUIRED)).label('Country'),
    email: yup
      .string()
      .min(2, 'emailError')
      .max(255)
      .email('validEmailError')
      .required(i18n.t(Strings.REQUIRED))
      .label('Email'),
    phoneNumber: yup
      .string()
      .min(10, i18n.t(Strings.THE_VALUE_ENTERED_IS_TOO_SHORT))
      .max(20, i18n.t(Strings.THE_VALUE_ENTERED_IS_TOO_LONG))
      .matches(PHONE_NUMBER_REGEX, PHONE_NUMBER_IS_NOT_VALID)
      .nullable()
      .required(i18n.t(Strings.REQUIRED))
      .label('Phone'),
  })
