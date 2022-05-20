export enum HomeNavigationRoutes {
  Home = 'Home',
  Profile = 'Profile',
  MyCv = 'MyCv',
  About = 'About',
  Experience = 'Experience',
  ExperienceForm = 'ExperienceForm',
  Education = 'Education',
  MySkills = 'MySkills',
  CompletedCourses = 'CompletedCourses',
  CompletedChallenges = 'CompletedChallenges',
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
  [HomeNavigationRoutes.MySkills]: undefined
  [HomeNavigationRoutes.CompletedCourses]: undefined
  [HomeNavigationRoutes.CompletedChallenges]: undefined
}
