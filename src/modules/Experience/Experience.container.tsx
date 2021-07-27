import { Dispatch } from '@reduxjs/toolkit'
import { selector as OrganisationsSelectors } from 'modules/Organisations'
import { actions as QualificationsActions } from 'modules/Qualifications'
import { QualificationRequestPayload } from 'modules/Qualifications/Qualifications.types'
import { selector as SkillsSelectors } from 'modules/Skills'
import { connect } from 'react-redux'
import { RootState } from 'redux/redux.types'

import Experience from './Experience'

const mapStateToProps = (state: RootState) => {
  return {
    qualifications: [],
    skills: SkillsSelectors.selectSkills(state),
    organisations: OrganisationsSelectors.selectOrganisations(state),
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onExperienceSave: (qualification: QualificationRequestPayload) => {
      dispatch(QualificationsActions.createQualifications(qualification))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
