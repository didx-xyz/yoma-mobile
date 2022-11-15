export enum UsersEndpoints {
  Password = 'password',
  Credentials = 'credentials',
  Certificate = 'certificate',
  Photo = 'photo',
  Skills = 'skills',
}

// TODO: Refactor this into 2 separate types. It should be a mapping for Credential types. The
//  second list should be of Opportunity types. Credential types are: Opportunity, Education and
//  Work Experience. All others are opportunity types.

export enum UserCredentialTypes {
  Assignment = 'Assignment',
  Challenge = 'Challenge',
  Education = 'education',
  Opportunity = 'opportunity',
  Qualification = 'Qualification',
  WorkExperience = 'workExperience',
}

export enum UserCredentialOpportunityTypes {
  Assignment = 'taskopportunity',
  Challenge = 'impactopportunity',
  Qualification = 'learningopportunity',
}
