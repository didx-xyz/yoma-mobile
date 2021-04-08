import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

export default () => {
  const { t } = useTranslation()
  return yup.object().shape({
    title: yup.string().min(2).max(200).required(t('required')).label('Job title'),
    description: yup.string().min(2).max(1000).required(t('required')).label('Job description'),
    startDate: yup.date().max(new Date()).nullable().required(t('required')),
    endDate: yup
      .date()
      .when('startDate', (eventStartDate: any, schema: any) => (eventStartDate ? schema.min() : schema))
      .max(new Date())
      .nullable()
      .required(t('required')),
    skillNames: yup.array().of(yup.string().max(30).label('A skill')).required(t('required')).label('Skills developed'),
    organisationId: yup.string().when('noResultInd', {
      is: false,
      then: yup.string().required(t('required')),
    }),
    organisationName: yup
      .string()
      .when('noResultInd', {
        is: true,
        then: yup.string().min(2).max(50).required(t('required')),
      })
      .label('Organisation name'),
    organisationWebsite: yup
      .string()
      .when('noResultInd', {
        is: true,
        then: yup.string().min(2).max(100).required(t('required')),
      })
      .label('Organisation website'),
    primaryContactName: yup
      .string()
      .when('noResultInd', {
        is: true,
        then: yup.string().min(2).max(50).required(t('required')),
      })
      .label('Primary contact name'),
    primaryContactEmail: yup
      .string()
      .email()
      .when('noResultInd', {
        is: true,
        then: yup.string().email().min(2).max(255).required(t('required')),
      })
      .label('Primary contact email'),
  })
}
