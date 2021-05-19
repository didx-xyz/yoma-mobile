import { FormikProps, FormikValues } from 'formik'
import { head, join, juxt, pipe, tail, toUpper, trim, filter, equals } from 'ramda'

export const mapToDropDownArray = (array: Record<string, string>[], valueProp = 'key', labelProp = 'value') => {
  return array.map((opt: Record<string, string>) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))
}

export const getUppercasedHead = (data: string) => pipe(trim, head, toUpper)(data)

export const capitalize = pipe(juxt([pipe(head, toUpper), tail]), join(''))

export const filterStringArray = (value: string, array: string[]) =>
  filter((element: string) => element !== value)(array)

export const textOrSpace = (condition: boolean, text: string) => (condition ? text : ' ')

export const dropElement = (value: string, array: string[]) => filter((element: string) => element !== value)(array)

export const compareFormikObject = (ref: FormikProps<FormikValues>) =>
  !equals(ref.initialValues, ref.values) && ref.isValid
