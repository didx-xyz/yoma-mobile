import React from 'react'
import { useSelector } from 'react-redux'

import { EducationNavigation } from '~/modules/Education/types'

import EducationView from './EducationView'
import selector from './EducationView.selector'

interface Props {
  onAdd: () => void
  navigation: EducationNavigation
}
const EducationViewContainer = ({ onAdd, navigation }: Props) => {
  const { userQualifications } = useSelector(selector)

  return <EducationView onAdd={onAdd} navigation={navigation} userQualifications={userQualifications} />
}

export default EducationViewContainer
