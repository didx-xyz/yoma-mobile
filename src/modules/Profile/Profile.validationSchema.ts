import * as yup from 'yup'

import { nameHasDigitsOrSymbols } from '~/utils/regex'

const PHONE_NUMBER_REG_EX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const profileValidationSchema = () =>
  yup.object().shape({
    firstName: yup
      .string()
      .min(2)
      .max(50)
      .required('required')
      .test('First name', 'First name cannot include numbers or symbols', value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('First name'),
    lastName: yup
      .string()
      .min(2)
      .max(50)
      .required('required')
      .test('Last name', 'Last name cannot include numbers or symbols', value => {
        return !nameHasDigitsOrSymbols(value!)
      })
      .label('Last name'),
    countryAlpha2: yup.string().required('Required').label('Country'),
    email: yup.string().min(2, 'emailError').max(255).email('validEmailError').required('required').label('Email'),
    phoneNumber: yup
      .string()
      .required('required')
      .matches(PHONE_NUMBER_REG_EX, 'Phone number is not valid')
      .min(10, 'too short')
      .max(13, 'too long')
      .nullable(),
  })
