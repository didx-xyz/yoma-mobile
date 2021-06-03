import api from 'api'
import { USER_ID } from 'helpers/helpers'
import ImagePicker, { Image, Options } from 'react-native-image-crop-picker'
import { showSimpleMessage } from 'utils/error'

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

export const getUserData = async (userId: string) => {
  try {
    const response = await api.users.getById(userId)
    return response.data
  } catch (error) {
    showSimpleMessage('danger', 'Error', error)
  }
}

const uploadImage = async (image: Image) => {
  const photo = {
    name: 'Photo',
    filename: image.path.substring(image.path.lastIndexOf('/') + 1),
    type: image.mime,
    data: image.data,
  }
  try {
    const response = await api.users.photo.create(USER_ID, photo)
    if (response.data) {
      return JSON.parse(response.data)
    }
  } catch (error) {
    throw error
  }
}

export const captureImage = () => {
  try {
    return ImagePicker.openCamera(CAPTURE_IMAGE_OPTIONS)
  } catch (error) {
    console.log('error', error)
  }
}

export const captureAndUploadImage = () => {
  return captureImage()
    ?.then(image => uploadImage(image))
    .catch(error => {
      throw error
    })
}
