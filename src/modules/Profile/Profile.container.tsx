import { Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as AuthActions from '~/modules/Auth/Auth.reducer'
import { actions as UserActions } from '~/modules/User'

import Profile from './Profile'
import selector from './Profile.selector'
import { ProfileNavigation } from './Profile.types'
import { schema } from './Profile.validation'

interface Props {
  navigation: ProfileNavigation
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
