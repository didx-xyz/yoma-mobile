import * as yup from 'yup'

export default () => {
  return yup.object().shape({
    school: yup.string().min(2).max(200).required('Required'),
    qualificationType: yup.string().min(2).max(30).required('Required'),
    country: yup.string().required('Required'),
    startDate: yup.date().nullable().required('Required'),
    endDate: yup
      .date()
      .when('startDate', (eventStartDate: any, schema: any) =>
        eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
      )
      .nullable()
      .required('Required'),
    description: yup.string().min(2).max(1000).required('Required'),
    skillNames: yup.array(yup.string()).min(1).label('Skills developed').required('Required'),
  })
}
