import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { HomeNavigationRoutes, HomeNavigatorParamsList } from '../HomeNavigation/HomeNavigation.types'
import { actions as UserActions } from '../User'
import Profile from './Profile'
import selector from './Profile.selector'
import { schema } from './Profile.validation'

interface Props {
  navigation: StackNavigationProp<HomeNavigatorParamsList, HomeNavigationRoutes.Profile>
}
const ProfileContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { user } = useSelector(selector)

  const onLogoutUser = () => {
    dispatch(AuthActions.logout())
  }

  const onProfileSave = (user: any) => {
    dispatch(UserActions.updateUser(user))
  }

  const onPhotoSave = () => {
    dispatch(UserActions.uploadUserPhoto())
  }

  return (
    <Formik initialValues={user} enableReinitialize validationSchema={schema} onSubmit={onProfileSave}>
      {formikHandlers => (
        <Profile
          user={user}
          onPhotoSave={onPhotoSave}
          onLogoutUser={onLogoutUser}
          navigation={navigation}
          form={formikHandlers}
        />
      )}
    </Formik>
  )
}

export default ProfileContainer
