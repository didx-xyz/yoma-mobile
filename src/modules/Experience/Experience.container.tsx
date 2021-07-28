import { Dispatch } from '@reduxjs/toolkit'
import { actions as QualificationsActions, types as QualificationsTypes } from 'modules/Qualifications'
import { connect } from 'react-redux'

import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onExperienceSave: (qualification: QualificationsTypes.QualificationRequestPayload) => {
      dispatch(QualificationsActions.createQualifications(qualification))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
