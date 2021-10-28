import { DocumentPickerResponse } from 'react-native-document-picker'

export type FormFields = {
  title: string
  description: string
  organisationId: string
  countries: string[] | null
  startTime: string | Date | null
  endTime: string | Date | null
  skillNames: string[]
  certificate: DocumentPickerResponse | null
}
