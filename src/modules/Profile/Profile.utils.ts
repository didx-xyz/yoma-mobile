import api from 'api'
import { USER_ID } from 'helpers/helpers'
import ImagePicker, { Image, Options } from 'react-native-image-crop-picker'
import { showSimpleMessage } from 'utils/error'

export const getUserData = async () => {
  try {
    const response = await api.users.getById(USER_ID)
    return response.data
  } catch (error) {
    console.log('error', error)
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
    return JSON.parse(response.data)
  } catch (error) {
    showSimpleMessage('danger', 'Error', error)
  }
}

export const captureImage = async () => {
  const options: Options = {
    cropping: true,
    includeBase64: true,
    freeStyleCropEnabled: true,
    forceJpg: true,
    mediaType: 'photo',
    useFrontCamera: true,
    cropperCircleOverlay: true,
    compressImageQuality: 0.2,
  }
  try {
    const image = await ImagePicker.openCamera(options)
    return await uploadImage(image)
  } catch (error) {
    console.log('error', error)
  }
}
