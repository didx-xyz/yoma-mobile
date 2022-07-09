import i18n from 'i18next'
import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = yup.object().shape({
  title: yup.string().min(2).max(30).required(i18n.t(Strings.REQUIRED)),
  description: yup.string().min(2).max(1000).required(i18n.t(Strings.REQUIRED)),
  organisationId: yup.string().min(2).max(200).required(i18n.t(Strings.REQUIRED)),
  startTime: yup
    .date()
    .max(new Date(), i18n.t(Strings.START_DATE_CANNOT_BE_IN_THE_FUTURE))
    .nullable()
    .required(i18n.t(Strings.REQUIRED)),
  endTime: yup
    .date()
    .when('startDate', (eventStartDate: any, s: any) =>
      eventStartDate ? s.min(eventStartDate, i18n.t(Strings.END_DATE_CANNOT_BE_BEFORE_START_DATE)) : s,
    )
    .max(new Date(), i18n.t(Strings.END_DATE_CANNOT_BE_IN_THE_FUTURE))
    .nullable()
    .required(i18n.t(Strings.REQUIRED)),
  skillNames: yup.array(yup.string()).min(1).label(i18n.t('Skills developed')).required(i18n.t(Strings.REQUIRED)),
})
