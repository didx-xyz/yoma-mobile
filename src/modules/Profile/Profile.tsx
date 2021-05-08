import api from 'api'
import { EditIcon } from 'assets/images'
import { Card, NormalHeader, Optional, ProfilePhoto, ViewContainer } from 'components'
import Button, { ButtonVariants } from 'components/Button'
import { FormikProps, FormikValues } from 'formik'
import { USER_ID } from 'helpers/helpers'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { Colors } from 'styles'
import { showSimpleMessage } from 'utils/error'

import styles from './Profile.styles'
import ProfileForm from './ProfileForm/ProfileForm'

interface Props {
  navigation: any
}

const Profile = ({ navigation }: Props) => {
  const [profileImage, setProfileImage] = useState('')
  const { t } = useTranslation()
  const childRef = useRef<FormikProps<FormikValues>>()

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    await api.users
      .getById(USER_ID)
      .then(async response => {
        const userData = response.data
        const { photoURL } = userData
        setProfileImage(photoURL)
      })
      .catch(error => {
        console.log('error', error)
        showSimpleMessage('danger', 'Error', error)
      })
  }

  async function onSubmit(image: any) {
    const photo = {
      name: 'Photo',
      filename: image.path.substring(image.path.lastIndexOf('/') + 1),
      type: image.mime,
      data: image.data,
    }
    try {
      const response = await api.users.photo.create(USER_ID, photo)
      console.log(response)
    } catch (error) {
      showSimpleMessage('danger', 'Error', error)
    }
  }

  const captureImage = () => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
      freeStyleCropEnabled: true,
      forceJpg: true,
      mediaType: 'photo',
      useFrontCamera: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.5,
    })
      .then(async image => {
        onSubmit(image)
        setProfileImage(image.data)
      })
      .catch(e => {
        console.log('error in image', e)
      })
  }

  return (
    <ViewContainer style={styles.container}>
      <NormalHeader navigation={navigation} headerText={'Profile'} onSave={childRef.current?.handleSubmit} />
      <ScrollView>
        <Card style={styles.card}>
          <Optional
            condition={profileImage === ''}
            fallback={
              <ProfilePhoto
                borderWidth={6}
                outerRadius={40}
                onPress={captureImage}
                percent={5}
                showEditIcon={true}
                profileOuterStyle={styles.profileContainer}
              />
            }
          >
            <TouchableOpacity onPress={captureImage}>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </Optional>
          <ProfileForm ref={childRef} navigation={navigation} />
        </Card>
        <Button
          variant={ButtonVariants.Clear}
          color={Colors.menuGrey}
          label={t('Log Out')}
          onPress={() =>
            navigation.reset({
              routes: [{ name: 'Authentication' }],
            })
          }
          style={styles.logout}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default Profile
