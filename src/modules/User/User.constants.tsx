import { Options } from 'react-native-image-crop-picker'

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

export const PHOTO_UPLOAD_FORM_NAME = 'Photo'
export const USER_CREDENTIAL_FORM_DATA_NAME = 'File'
