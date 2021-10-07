import { StackNavigationProp } from '@react-navigation/stack'
import { FormikProps } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'

import { EditIcon } from '../../assets/images'
import Button, { ButtonSave, ButtonVariants } from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Optional from '../../components/Optional'
import ProfilePhoto from '../../components/ProfilePhoto'
import ViewContainer from '../../components/ViewContainer'
import { Colors } from '../../styles'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import ProfileForm from './Profile.form'
import styles from './Profile.styles'
import { ProfileFormUser } from './Profile.types'

interface Props {
  onLogoutUser: () => void
  onPhotoSave: () => void
  user: ProfileFormUser
  form: FormikProps<any>
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
}

const Profile = ({ navigation, onLogoutUser, onPhotoSave, user, form }: Props) => {
  const { t } = useTranslation()

  return (
    <ViewContainer style={styles.container}>
      <Header
        navigation={navigation}
        headerText={t('Profile')}
        actionItem={<ButtonSave onPress={form.handleSubmit} isDisabled={!form.isValid} />}
      />
      <ScrollView>
        <Card style={styles.card}>
          <Optional
            condition={!!user.photoURL}
            fallback={
              <ProfilePhoto
                size={78}
                borderWidth={6}
                outerRadius={40}
                onPress={onPhotoSave}
                percent={5}
                showEditIcon={true}
                profileOuterStyle={styles.imagePlaceholder}
              />
            }
          >
            <TouchableOpacity onPress={onPhotoSave} style={styles.imageContainer}>
              <Image source={{ uri: user.photoURL as string }} style={styles.profileImage} />
              <View style={styles.editIcon}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </Optional>
          <ProfileForm />
        </Card>
        <Button
          variant={ButtonVariants.Clear}
          color={Colors.MenuGrey}
          label={t('Log Out')}
          onPress={onLogoutUser}
          style={styles.logout}
        />
      </ScrollView>
    </ViewContainer>
  )
}

export default Profile
