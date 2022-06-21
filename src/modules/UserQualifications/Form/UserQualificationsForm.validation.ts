import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = yup.object().shape({
  title: yup.string().min(2).max(30).required(Strings.REQUIRED),
  description: yup.string().min(2).max(1000).required(Strings.REQUIRED),
  organisationId: yup.string().min(2).max(200).required(Strings.REQUIRED),
  startTime: yup
    .date()
    .max(new Date(), Strings.START_DATE_CANNOT_BE_IN_THE_FUTURE)
    .nullable()
    .required(Strings.REQUIRED),
  endTime: yup
    .date()
    .when('startDate', (eventStartDate: any, s: any) =>
      eventStartDate ? s.min(eventStartDate, Strings.END_DATE_CANNOT_BE_BEFORE_START_DATE) : s,
    )
    .max(new Date(), Strings.END_DATE_CANNOT_BE_IN_THE_FUTURE)
    .nullable()
    .required(Strings.REQUIRED),
  skillNames: yup.array(yup.string()).min(1).label('Skills developed').required(Strings.REQUIRED),
})
