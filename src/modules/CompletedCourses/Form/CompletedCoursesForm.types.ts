import { DocumentPickerResponse } from 'react-native-document-picker'

export type FormFields = {
  title: string
  provider: string
  description: string
  startTime: string | Date | null
  endTime: string | Date | null
  skillNames: string[]
  certificate: DocumentPickerResponse | null
}
