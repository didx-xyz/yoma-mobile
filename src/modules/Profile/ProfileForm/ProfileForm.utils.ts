import api from 'api'
import { FormikValues } from 'formik'
import { USER_ID } from 'helpers/helpers'

export const editProfile = async (values: FormikValues) => {
  try {
    return await api.users.edit(USER_ID, values)
  } catch (error) {
    console.log('error', error)
  }
}
