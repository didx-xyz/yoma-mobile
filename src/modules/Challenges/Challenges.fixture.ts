import { createFixture } from 'tests/tests.utils'

const CHALLENGES_STATE_MOCK = {
  entities: {
    '2598575f-5caf-42ff-f314-08d7fc042142': {
      skills: ['Digital Currencies'],
      countries: ['ZA'],
      unverifiedCredentials: 0,
      approvedCredentials: 0,
      rejectedCredentials: 0,
      totalZLTORewarded: 0,
      skillsLearned: 0,
      organisationId: '13c7d33a-918e-418b-ba60-ef2cc352f9ff',
      organisationName: 'Cartedo',
      organisationLogoURL: 'https://pbs.twimg.com/profile_images/1069767596306780160/bBLu6cCU_400x400.png',
      id: '2598575f-5caf-42ff-f314-08d7fc042142',
      title: 'Covid-19',
      description:
        'COVID-19 is impacting us all as we deal with the new normal of social distancing and lockdowns. Misinformation and fake news amplify our fears. Hard realities like loss of income, job insecurity, stalled education, food shortages and lack of cleanwater, force us to explore unique ways to cope. While we cannot always prevent such impacts, we can be better prepared. UNICEF has partnered with Cartedo to empower youth across Africa to solve a series of global grand challenges and positively impact communities while developing employability skills. We believe that youth have unique perspectives on these challenges and should be given the opportunity to become knowledge producers. This is your chance to Be seen, Be heard and Be the Change!',
      url: 'https://app.cartedo.com/project/8/covid-19-challenge',
      createdAt: '2020-06-30T16:55:20.2174438',
      zltoReward: 500,
      createdByAdmin: true,
      language: 'EN',
      startTime: null,
      endTime: null,
      published: true,
    },
    '19fcf710-d250-48ba-b630-08d81d3222f2': {
      skills: ['A/B Testing'],
      countries: ['AF'],
      unverifiedCredentials: 4,
      approvedCredentials: 0,
      rejectedCredentials: 0,
      totalZLTORewarded: 0,
      skillsLearned: 0,
      organisationId: '7f9df1bc-10b8-445c-0b4a-08d81d3203ed',
      organisationName: 'Test Org',
      organisationLogoURL:
        'https://yoma-test-file-storage.s3.eu-west-1.amazonaws.com/Staging/Certificates/f89346a2-7635-40b0-8afd-a23a829dd8c0?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2MNSETAVPYWP7TMB/20210915/eu-west-1/s3/aws4_request&X-Amz-Date=20210915T193543Z&X-Amz-SignedHeaders=host&X-Amz-Signature=065ede63c49706a5e16b6b2e2d92d40459d17e20bf92ad858e840317868bb802',
      id: '19fcf710-d250-48ba-b630-08d81d3222f2',
      title: 'Test Retool Challenge',
      description: 'Testing',
      url: 'www.google.com',
      createdAt: '2020-06-30T20:15:51.458944',
      zltoReward: 100,
      createdByAdmin: true,
      language: 'EN',
      startTime: null,
      endTime: null,
      published: true,
    },
    '4fc8c0a4-8856-41e4-34e1-08d86faaeb08': {
      skills: [],
      countries: [],
      unverifiedCredentials: 1,
      approvedCredentials: 0,
      rejectedCredentials: 0,
      totalZLTORewarded: 0,
      skillsLearned: 0,
      organisationId: '13c7d33a-918e-418b-ba60-ef2cc352f9ff',
      organisationName: 'Cartedo',
      organisationLogoURL: 'https://pbs.twimg.com/profile_images/1069767596306780160/bBLu6cCU_400x400.png',
      id: '4fc8c0a4-8856-41e4-34e1-08d86faaeb08',
      title: 'Tideturners Challenge',
      description:
        'This challenge gives young people an opportunity to explore how we might address the challenges of plastic pollution on land and sea, with a focus on finding sustainable alternatives to plastic while inspiring behavior change in the production and consumption of plastic among young people and their communities. We are looking for ideas to solve real challenges faced by real people, just like you. This challenge offers you the opportunity to develop future-ready employability skills alike design thinking while contributing to the global efforts to beat plastic pollution.\n\nAs you progress through this challenge you will use a human-centered design approach to discover different ways in which plastic waste and plastic pollution is affecting marine, land and human life, define these challenges from a human-centered perspective and develop innovative solutions to these challenges.',
      url: 'https://app.cartedo.com/project/9/plastic-tide-turners-challenge',
      createdAt: '2020-10-13T19:05:15.1219131',
      zltoReward: 500,
      createdByAdmin: true,
      language: 'EN',
      startTime: null,
      endTime: null,
      published: true,
    },
    '04cd1679-e013-4de9-565a-08d8d4b42f40': {
      skills: ['Drone Pilot Certificate'],
      countries: ['BY'],
      unverifiedCredentials: 2,
      approvedCredentials: 0,
      rejectedCredentials: 0,
      totalZLTORewarded: 0,
      skillsLearned: 0,
      organisationId: 'e9b0e27c-4de6-42d5-6a1c-08d832cae537',
      organisationName: 'Employer',
      organisationLogoURL: null,
      id: '04cd1679-e013-4de9-565a-08d8d4b42f40',
      title: 'Test Challenge',
      description: 'Test Challenge',
      url: null,
      createdAt: '2021-02-19T08:56:02.4857815',
      zltoReward: null,
      createdByAdmin: true,
      language: 'EN',
      startTime: null,
      endTime: null,
      published: true,
    },
    '61b3783c-2f7b-46b5-2e05-08d92e9e2636': {
      skills: ['Design Thinking', 'Design Thinking'],
      countries: ['AX'],
      unverifiedCredentials: 0,
      approvedCredentials: 0,
      rejectedCredentials: 0,
      totalZLTORewarded: 0,
      skillsLearned: 0,
      organisationId: '6baf2197-8f85-4289-477d-08d92e9cc88c',
      organisationName: 'IDDQD',
      organisationLogoURL:
        'https://yoma-test-file-storage.s3.eu-west-1.amazonaws.com/Staging/Certificates/f89346a2-7635-40b0-8afd-a23a829dd8c0?X-Amz-Expires=1800&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2MNSETAVPYWP7TMB/20210915/eu-west-1/s3/aws4_request&X-Amz-Date=20210915T193543Z&X-Amz-SignedHeaders=host&X-Amz-Signature=065ede63c49706a5e16b6b2e2d92d40459d17e20bf92ad858e840317868bb802',
      id: '61b3783c-2f7b-46b5-2e05-08d92e9e2636',
      title: 'Make Your Own Bingo!',
      description: 'What fun',
      url: null,
      createdAt: '2021-06-13T19:05:03.0410213',
      zltoReward: 0,
      createdByAdmin: true,
      language: 'EN',
      startTime: '2021-06-12T22:00:00',
      endTime: '2021-06-16T22:00:00',
      published: true,
    },
  },
  ids: [
    '2598575f-5caf-42ff-f314-08d7fc042142',
    '19fcf710-d250-48ba-b630-08d81d3222f2',
    '4fc8c0a4-8856-41e4-34e1-08d86faaeb08',
    '04cd1679-e013-4de9-565a-08d8d4b42f40',
    '61b3783c-2f7b-46b5-2e05-08d92e9e2636',
  ],
}

export const challengesStateFixture = createFixture(CHALLENGES_STATE_MOCK)
