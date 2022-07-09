import * as Yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = Yup.object().shape({
  credentialItemId: Yup.string().min(2).max(200).required(Strings.REQUIRED),
  startTime: Yup.date()
    .max(new Date(), Strings.START_DATE_CANNOT_BE_IN_THE_FUTURE)
    .nullable()
    .required(Strings.REQUIRED),
  endTime: Yup.date()
    .when('startDate', (eventStartDate: any, dateSchema: any) =>
      eventStartDate ? dateSchema.min(eventStartDate, Strings.START_DATE_CANNOT_BE_IN_THE_FUTURE) : dateSchema,
    )
    .max(new Date(), Strings.END_DATE_CANNOT_BE_IN_THE_FUTURE)
    .nullable()
    .required(Strings.REQUIRED),
  requestVerification: Yup.boolean(),
})
