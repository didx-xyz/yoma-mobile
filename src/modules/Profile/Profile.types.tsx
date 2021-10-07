import { FormikValues } from 'formik'

export interface ProfileFormState {
  values: FormikValues
  isValid: boolean
}

export interface ProfileFormUser {
  firstName: string
  lastName: string
  email: string | null
  countryAlpha2: string | null
  phoneNumber: string | null
  photoURL: string | null
}
