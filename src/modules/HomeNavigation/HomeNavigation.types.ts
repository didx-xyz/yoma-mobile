import { opportunities } from '~/modules/Opportunities/Opportunities.types'

export enum HomeNavigationRoutes {
  About = 'About',
  AboutForm = 'AboutForm',
  CompletedChallenges = 'CompletedChallenges',
  CompletedChallengesForm = 'CompletedChallengesForm',
  CompletedCourses = 'CompletedCourses',
  CompletedCoursesForm = 'CompletedCoursesForm',
  Education = 'Education',
  EducationForm = 'EducationForm',
  Experience = 'Experience',
  ExperienceForm = 'ExperienceForm',
  Home = 'Home',
  MyCv = 'MyCv',
  MySkills = 'MySkills',
  MySkillsForm = 'MySkillsForm',
  Courses = 'Courses',
  CourseDetails = 'CourseDetails',
  CourseVerification = 'CourseVerification',
  Profile = 'Profile',
  Opportunities = 'Opportunities',
  MyWeb = 'MyWeb',
  Search = 'Search',
}

export enum HomeTabRoutes {
  Opportunities = 'Opportunities',
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
  [HomeNavigationRoutes.CourseDetails]: opportunities
  [HomeNavigationRoutes.Courses]: undefined
  [HomeNavigationRoutes.CourseVerification]: opportunities
  [HomeNavigationRoutes.Education]: undefined
  [HomeNavigationRoutes.EducationForm]: undefined
  [HomeNavigationRoutes.Experience]: undefined
  [HomeNavigationRoutes.ExperienceForm]: undefined
  [HomeNavigationRoutes.Home]: undefined
  [HomeNavigationRoutes.MyCv]: undefined
  [HomeNavigationRoutes.MySkills]: undefined
  [HomeNavigationRoutes.MySkillsForm]: undefined
  [HomeNavigationRoutes.MyWeb]: { url: string | null }
  [HomeNavigationRoutes.Opportunities]: undefined
  [HomeNavigationRoutes.Profile]: undefined
  [HomeNavigationRoutes.Search]: undefined
}
