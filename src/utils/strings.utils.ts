export const mapToSelect = (options: any[], valueProp = 'key', labelProp = 'value') => {
  return options.map((opt: any) => ({
    label: opt[labelProp],
    value: opt[valueProp],
  }))
}

export const getFirstCharacter = (data: string) => data.trim().charAt(0).toUpperCase()
