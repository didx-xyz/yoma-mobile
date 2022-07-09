import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'
import {
  FIRST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS,
  LAST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS,
  PHONE_NUMBER_IS_NOT_VALID,
} from '~/modules/Profile/Profile.constants'
import { nameHasDigitsOrSymbols } from '~/utils/regex'

const PHONE_NUMBER_REG_EX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\(\d{2,3}\\)[ \\-]*)|(\d{2,4})[ \\-]*)*?\d{3,4}?[ \\-]*\d{3,4}?$/

export const schema = () =>
  yup.object().shape({
    firstName: yup
      .string()
      .min(2)
      .max(50)
      .required(Strings.REQUIRED)
      .test('First name', FIRST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS, value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('First name'),
    lastName: yup
      .string()
      .min(2)
      .max(50)
      .required(Strings.REQUIRED)
      .test('Last name', LAST_NAME_CANNOT_INCLUDE_NUMBERS_OR_SYMBOLS, value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('Last name'),
    countryAlpha2: yup.string().required(Strings.REQUIRED).label('Country'),
    email: yup
      .string()
      .min(2, 'emailError')
      .max(255)
      .email('validEmailError')
      .required(Strings.REQUIRED)
      .label('Email'),
    phoneNumber: yup
      .string()
      .required(Strings.REQUIRED)
      .matches(PHONE_NUMBER_REG_EX, PHONE_NUMBER_IS_NOT_VALID)
      .min(10, Strings.THE_VALUE_ENTERED_IS_TOO_SHORT)
      .max(13, Strings.THE_VALUE_ENTERED_IS_TOO_LONG)
      .nullable(),
  })
