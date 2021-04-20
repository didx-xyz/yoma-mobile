export const mapToSelect = (options: any[], valueProp = 'key', labelProp = 'value') => {
  return options.map((opt: any) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))
}
