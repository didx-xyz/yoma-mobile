import * as Yup from 'yup'

import * as ValidationStrings from '~/constants/strings.constants'

export const schema = Yup.object().shape({
  title: Yup.string().min(2).max(200).required(ValidationStrings.REQUIRED),
  description: Yup.string().min(2).max(1000).required(ValidationStrings.REQUIRED),
  organisationId: Yup.string().required(ValidationStrings.REQUIRED),
  startTime: Yup.date().nullable().required(ValidationStrings.REQUIRED),
  endTime: Yup.date()
    .when('startTime', (eventStartDate: any, dateSchema: any) =>
      eventStartDate
        ? dateSchema.min(eventStartDate, ValidationStrings.END_DATE_CANNOT_BE_BEFORE_START_DATE)
        : dateSchema,
    )
    .nullable()
    .required(ValidationStrings.REQUIRED),
})
