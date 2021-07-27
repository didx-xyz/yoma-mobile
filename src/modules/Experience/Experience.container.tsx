import { Dispatch } from '@reduxjs/toolkit'
import { actions as QualificationsActions } from 'modules/Qualifications'
import { QualificationRequestPayload } from 'modules/Qualifications/Qualifications.types'
import { connect } from 'react-redux'

import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onExperienceSave: (qualification: QualificationRequestPayload) => {
      dispatch(QualificationsActions.createQualifications(qualification))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
