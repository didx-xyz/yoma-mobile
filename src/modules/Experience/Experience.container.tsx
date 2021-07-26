import { Dispatch } from '@reduxjs/toolkit'
import { selector as OrganisationsSelectors } from 'modules/Organisations'
import { selector as SkillsSelectors } from 'modules/Skills'
import { actions as CredentialsActions } from 'modules/UserCredentials'
import { connect } from 'react-redux'
import { RootState } from 'redux/redux.types'

import Experience from './Experience'
import { QualificationRequestPayload } from './Experience.types'

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
      dispatch(CredentialsActions.createQualificationCredential(qualification))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
