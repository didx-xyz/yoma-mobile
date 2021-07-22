import FormData from 'form-data'
import { PhotoUploadFormConfig } from 'modules/User/User.types'
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
export const photoUploadFormConfig: PhotoUploadFormConfig = {
  formName: 'Photo',
  formInstance: new FormData(),
}
