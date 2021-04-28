export const mapToDropDownArray = (array: Record<string, string>[], valueProp = 'key', labelProp = 'value') => {
  return array.map((opt: Record<string, string>) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))
}
