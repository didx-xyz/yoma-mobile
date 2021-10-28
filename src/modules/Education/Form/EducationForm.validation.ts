import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().min(2).max(30).required('Required'),
  description: yup.string().min(2).max(1000).required('Required'),
  organisationId: yup.string().min(2).max(200).required('Required'),
  startTime: yup.date().max(new Date(), 'Start date cannot be in the future').nullable().required('Required'),
  endTime: yup
    .date()
    .when('startDate', (eventStartDate: any, schema: any) =>
      eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
    )
    .max(new Date(), 'End date cannot be in the future')
    .nullable()
    .required('Required'),
  skillNames: yup.array(yup.string()).min(1).label('Skills developed').required('Required'),
})
