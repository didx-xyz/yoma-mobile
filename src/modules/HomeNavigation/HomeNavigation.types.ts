export enum HomeNavigationRoutes {
  Home = 'Home',
  Profile = 'Profile',
  MyCv = 'MyCv',
  About = 'About',
  Experience = 'Experience',
  ExperienceForm = 'ExperienceForm',
  Education = 'Education',
  EducationForm = 'EducationForm',
  MySkills = 'MySkills',
  MySkillsForm = 'MySkillsForm',
  CompletedChallenges = 'CompletedChallenges',
  CompletedChallengesForm = 'CompletedChallengesForm',
}

export enum HomeTabRoutes {
  Courses = 'Courses',
  Challenges = 'Challenges',
  MarketPlace = 'MarketPlace',
  MyCv = 'MyCv',
}

export type HomeNavigatorParamsList = {
  [HomeNavigationRoutes.Home]: undefined
  [HomeNavigationRoutes.Profile]: undefined
  [HomeNavigationRoutes.MyCv]: undefined
  [HomeNavigationRoutes.About]: undefined
  [HomeNavigationRoutes.Experience]: undefined
  [HomeNavigationRoutes.ExperienceForm]: undefined
  [HomeNavigationRoutes.Education]: undefined
  [HomeNavigationRoutes.EducationForm]: undefined
  [HomeNavigationRoutes.MySkills]: undefined
  [HomeNavigationRoutes.MySkillsForm]: undefined
  [HomeNavigationRoutes.CompletedChallenges]: undefined
  [HomeNavigationRoutes.CompletedChallengesForm]: undefined
}
