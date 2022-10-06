export type FilterData = {
  skills: String
  type: String
  language: String
  countries: String
  dateposted: String
  organisationid: String
}

export type FilterItems = FilterItem[]

export type FilterItem = { label: string; value: String; ticked?: Boolean }
