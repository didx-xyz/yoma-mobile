import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'

import { WorkExperienceNavigation } from './WorkExperienceView.types'

interface Props {
  onAdd: () => void
  navigation: WorkExperienceNavigation
  userWorkExperiences: CvViewCredentialTypes.CvViewCredentialsData
}

const WorkExperienceView = ({ userWorkExperiences, navigation, onAdd }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Work Experiences')}
      noDataMessage={t('Where do you currently work?')}
      onAction={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userWorkExperiences} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default WorkExperienceView
