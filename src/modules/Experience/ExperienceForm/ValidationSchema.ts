import * as yup from 'yup'

export default () => {
  return yup.object().shape({
    title: yup.string().min(2).max(200).required('Required').label('Job title'),
    description: yup.string().min(2).max(1000).required('Required').label('Job description'),
    organisationId: yup.string().when('noResultInd', {
      is: false,
      then: yup.string().required('Required'),
    }),
    organisationName: yup.string().required('Required'),
    countryAlpha2: yup.string().required('Required').label('Country'),
    startDate: yup.date().nullable().required('Required'),
    endDate: yup
      .date()
      .when('startDate', (eventStartDate: any, schema: any) =>
        eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
      )
      .nullable()
      .required('Required'),
    // skillNames: yup
    //   .array()
    //   // .string()
    //   // .array()
    //   // .of(yup.string().max(30))
    //   .required('Required'),
  })
}
