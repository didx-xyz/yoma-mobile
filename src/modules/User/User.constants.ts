import { path, pathOr, propOr } from 'ramda'
import { Options } from 'react-native-image-crop-picker'

import { UserCredentialOpportunityTypes, UserCredentialTypes } from '~/api/users/users.types'

import { CredentialTypes } from './User.types'

export const CAPTURE_IMAGE_OPTIONS: Options = {
  cropping: true,
  includeBase64: true,
  freeStyleCropEnabled: true,
  forceJpg: true,
  mediaType: 'photo',
  useFrontCamera: true,
  cropperCircleOverlay: true,
  compressImageQuality: 0.2,
}

export const USER_PHOTO_FORM_DATA_NAME = 'Photo'
export const USER_CREDENTIAL_CERTIFICATE_FORM_DATA_NAME = 'File'

export const USER_OPPORTUNITY_CREDENTIAL_WIDGET_SELECTOR_SPEC = {
  title: pathOr('', [CredentialTypes.Opportunity, 'title']),
  startDate: propOr('', 'startDate'),
  organisationLogoURL: path([CredentialTypes.Opportunity, 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
}

export const USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC = {
  title: pathOr('', [CredentialTypes.Opportunity, 'title']),
  description: pathOr('', [CredentialTypes.Opportunity, 'description']),
  iconUrl: path([CredentialTypes.Opportunity, 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
}

export type UserCredentialsT = typeof USER_CREDENTIALS
export const USER_CREDENTIALS = { ...UserCredentialTypes, ...UserCredentialOpportunityTypes }
