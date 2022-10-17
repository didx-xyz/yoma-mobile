export enum HomeNavigationRoutes {
  About = 'About',
  AboutForm = 'AboutForm',
  CompletedChallenges = 'CompletedChallenges',
  CompletedChallengesForm = 'CompletedChallengesForm',
  CompletedCourses = 'CompletedCourses',
  CompletedCoursesForm = 'CompletedCoursesForm',
  Education = 'Education',
  EducationForm = 'EducationForm',
  WorkExperience = 'WorkExperience',
  WorkExperienceForm = 'WorkExperienceForm',
  Home = 'Home',
  MyCv = 'MyCv',
  MySkills = 'MySkills',
  MySkillsForm = 'MySkillsForm',
  Profile = 'Profile',
}

export enum HomeTabRoutes {
  Courses = 'Courses',
  Challenges = 'Challenges',
  MarketPlace = 'MarketPlace',
  MyCv = 'MyCv',
}

export type HomeNavigatorParamsList = {
  [HomeNavigationRoutes.About]: undefined
  [HomeNavigationRoutes.AboutForm]: undefined
  [HomeNavigationRoutes.CompletedChallenges]: undefined
  [HomeNavigationRoutes.CompletedChallengesForm]: undefined
  [HomeNavigationRoutes.CompletedCourses]: undefined
  [HomeNavigationRoutes.CompletedCoursesForm]: undefined
  [HomeNavigationRoutes.Education]: undefined
  [HomeNavigationRoutes.EducationForm]: undefined
  [HomeNavigationRoutes.WorkExperience]: undefined
  [HomeNavigationRoutes.WorkExperienceForm]: undefined
  [HomeNavigationRoutes.Home]: undefined
  [HomeNavigationRoutes.MyCv]: undefined
  [HomeNavigationRoutes.MySkills]: undefined
  [HomeNavigationRoutes.MySkillsForm]: undefined
  [HomeNavigationRoutes.Profile]: undefined
}
