import { DocumentPickerResponse } from 'react-native-document-picker'

export type FormFields = {
  credentialItemId: string
  startTime: Date | null
  endTime: Date | null
  requestVerification: boolean
  certificate: DocumentPickerResponse | null
}
