import React from 'react'
import { useTranslation } from 'react-i18next'

import CvView, { CvViewList } from '~/components/CvView'
import CvViewCredential, { types as CvViewCredentialTypes } from '~/components/CvViewCredential'

import { ExperienceNavigation } from './ExperienceView.types'

interface Props {
  onAdd: () => void
  navigation: ExperienceNavigation
  userJobs: CvViewCredentialTypes.CvViewCredentialsData
}

const ExperienceView = ({ userJobs, navigation, onAdd }: Props) => {
  const { t } = useTranslation()
  return (
    <CvView
      title={t('Experience')}
      noDataMessage={t('Where do you currently work?')}
      onAdd={onAdd}
      navigation={navigation}
    >
      <CvViewList data={userJobs} RenderItem={CvViewCredential} />
    </CvView>
  )
}

export default ExperienceView
