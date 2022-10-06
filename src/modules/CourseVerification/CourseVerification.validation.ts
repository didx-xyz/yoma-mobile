import * as yup from 'yup'

export const schema = yup.object().shape({
  startTime: yup.date().max(new Date(), 'Start date cannot be in the future').nullable().required('Required'),
  endTime: yup
    .date()
    .when('startDate', (eventStartDate: any, s: any) =>
      eventStartDate ? s.min(eventStartDate, 'End date cannot be before start date') : s,
    )
    .max(new Date(), 'End date cannot be in the future')
    .nullable()
    .required('Required'),
})
