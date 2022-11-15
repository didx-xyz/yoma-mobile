import { Options } from 'react-native-image-crop-picker'

import { types as ApiUserTypes } from '~/api/users'

import { getUserCredentialViewSelectorSpec, getUserCredentialWidgetSelectorSpec } from './User.utils'

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

export const USER_OPPORTUNITY_CREDENTIAL_WIDGET_SELECTOR_SPEC = getUserCredentialWidgetSelectorSpec(
  ApiUserTypes.UserCredentialTypes.Opportunity,
)

export const USER_OPPORTUNITY_CREDENTIAL_VIEW_SELECTOR_SPEC = getUserCredentialViewSelectorSpec(
  ApiUserTypes.UserCredentialTypes.Opportunity,
)

export const USER_CREDENTIAL_TYPES_MAP: Record<
  ApiUserTypes.UserCredentialTypes,
  ApiUserTypes.UserCredentialOpportunityTypes | null
> = {
  [ApiUserTypes.UserCredentialTypes.Assignment]: ApiUserTypes.UserCredentialOpportunityTypes.Assignment,
  [ApiUserTypes.UserCredentialTypes.Challenge]: ApiUserTypes.UserCredentialOpportunityTypes.Challenge,
  [ApiUserTypes.UserCredentialTypes.Qualification]: ApiUserTypes.UserCredentialOpportunityTypes.Qualification,
  [ApiUserTypes.UserCredentialTypes.WorkExperience]: null,
  [ApiUserTypes.UserCredentialTypes.Education]: null,
  [ApiUserTypes.UserCredentialTypes.Opportunity]: null,
}
