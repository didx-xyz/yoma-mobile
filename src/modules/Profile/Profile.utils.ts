import ImagePicker, { Options } from 'react-native-image-crop-picker'

const CAPTURE_IMAGE_OPTIONS: Options = {
  cropping: true,
  includeBase64: true,
  freeStyleCropEnabled: true,
  forceJpg: true,
  mediaType: 'photo',
  useFrontCamera: true,
  cropperCircleOverlay: true,
  compressImageQuality: 0.2,
}

export const captureImage = () => {
  try {
    return ImagePicker.openCamera(CAPTURE_IMAGE_OPTIONS)
  } catch (error) {
    console.log('error', error)
  }
}
