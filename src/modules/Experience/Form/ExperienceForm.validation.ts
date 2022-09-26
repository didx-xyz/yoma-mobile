import i18n from 'i18next'
import * as Yup from 'yup'

export const schema = Yup.object().shape({
  title: Yup.string().min(2).max(200).required(i18n.t('forms.validation.required')),
  description: Yup.string().min(2).max(1000).required(i18n.t('forms.validation.required')),
  organisationId: Yup.string().required(i18n.t('forms.validation.required')),
  startTime: Yup.date().nullable().required(i18n.t('forms.validation.required')),
  endTime: Yup.date()
    .when('startTime', (eventStartDate: any, dateSchema: any) =>
      eventStartDate
        ? dateSchema.min(eventStartDate, i18n.t('forms.validation.endDateNotBeforeStartDate'))
        : dateSchema,
    )
    .nullable()
    .required(i18n.t('forms.validation.required')),
})
