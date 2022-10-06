import { DocumentPickerResponse } from 'react-native-document-picker'

export type VerificationFields = {
  startTime: string | Date | null
  endTime: string | Date | null
  isVerified: boolean
  certificate: DocumentPickerResponse | null
}
