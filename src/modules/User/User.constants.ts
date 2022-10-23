import { path, pathOr, propOr } from 'ramda'
import { Options } from 'react-native-image-crop-picker'

import { types as ApiUserTypes } from '~/api/users'

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
  name: pathOr('', ['opportunity', 'title']),
  startDate: propOr('', 'startDate'),
  organisationLogoURL: path(['opportunity', 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
}
export const USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC = {
  title: pathOr('', ['opportunity', 'title']),
  description: pathOr('', ['opportunity', 'description']),
  iconUrl: path(['opportunity', 'organisationLogoURL']),
  isValidated: propOr(false, 'approved'),
}

export const USER_CREDENTIAL_TYPES_MAP: Record<
  ApiUserTypes.UserCredentialTypes,
  ApiUserTypes.UserCredentialOpportunityTypes | undefined
> = {
  [ApiUserTypes.UserCredentialTypes.Assignment]: ApiUserTypes.UserCredentialOpportunityTypes.Assignment,
  [ApiUserTypes.UserCredentialTypes.Education]: undefined,
  [ApiUserTypes.UserCredentialTypes.Challenge]: ApiUserTypes.UserCredentialOpportunityTypes.Challenge,
  [ApiUserTypes.UserCredentialTypes.Qualification]: ApiUserTypes.UserCredentialOpportunityTypes.Qualification,
  [ApiUserTypes.UserCredentialTypes.WorkExperience]: ApiUserTypes.UserCredentialOpportunityTypes.WorkExperience,
}
