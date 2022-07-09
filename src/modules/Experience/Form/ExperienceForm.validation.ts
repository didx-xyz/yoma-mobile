import i18n from 'i18next'
import * as Yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = Yup.object().shape({
  title: Yup.string().min(2).max(200).required(i18n.t(Strings.REQUIRED)),
  description: Yup.string().min(2).max(1000).required(i18n.t(Strings.REQUIRED)),
  organisationId: Yup.string().required(i18n.t(Strings.REQUIRED)),
  startTime: Yup.date().nullable().required(i18n.t(Strings.REQUIRED)),
  endTime: Yup.date()
    .when('startTime', (eventStartDate: any, dateSchema: any) =>
      eventStartDate
        ? dateSchema.min(eventStartDate, i18n.t(Strings.END_DATE_CANNOT_BE_BEFORE_START_DATE))
        : dateSchema,
    )
    .nullable()
    .required(i18n.t(Strings.REQUIRED)),
})
