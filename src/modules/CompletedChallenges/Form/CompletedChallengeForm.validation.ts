import i18n from 'i18next'
import * as Yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = Yup.object().shape({
  credentialItemId: Yup.string().min(2).max(200).required(i18n.t(Strings.REQUIRED)),
  startTime: Yup.date()
    .max(new Date(), i18n.t(Strings.START_DATE_CANNOT_BE_IN_THE_FUTURE))
    .nullable()
    .required(i18n.t(Strings.REQUIRED)),
  endTime: Yup.date()
    .when('startDate', (eventStartDate: any, dateSchema: any) =>
      eventStartDate ? dateSchema.min(eventStartDate, i18n.t(Strings.START_DATE_CANNOT_BE_IN_THE_FUTURE)) : dateSchema,
    )
    .max(new Date(), i18n.t(Strings.END_DATE_CANNOT_BE_IN_THE_FUTURE))
    .nullable()
    .required(i18n.t(Strings.REQUIRED)),
  requestVerification: Yup.boolean(),
})
