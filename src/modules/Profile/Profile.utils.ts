import ImagePicker from 'react-native-image-crop-picker'

import { CAPTURE_IMAGE_OPTIONS } from './Profile.constants'

export const profileImagePicker = async () => await ImagePicker.openCamera(CAPTURE_IMAGE_OPTIONS)
