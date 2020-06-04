export interface CourseListQuiz {
  id: string
  grantPointsPolicy: GrantPointsPolicy
  courseId: string
  part: number
  section: number
  points: number
  tries: number
  triesLimited: boolean
  deadline: null
  open: null
  autoConfirm: boolean
  autoReject: boolean
  excludedFromScore: boolean
  awardPointsEvenIfWrong: boolean
  createdAt: Date
  updatedAt: Date
  texts: QuizText[]
  course: QuizCourse
  items: Item[]
  peerReviewCollections: any[]
}

export interface QuizCourse {
  id: string
  minScoreToPass: null
  minProgressToPass: null
  minPeerReviewsReceived: null
  minPeerReviewsGiven: null
  minReviewAverage: null
  maxSpamFlags: null
  moocfiId: null
  createdAt: Date
  updatedAt: Date
  languages: Language[]
  texts: CourseText[]
}

export interface Language {
  id: LanguageID
  country: Country
  name: Name
  createdAt: Date
  updatedAt: Date
}

export enum Country {
  Finland = "Finland",
}

export enum LanguageID {
  FiFI = "fi_FI",
}

export enum Name {
  Finnish = "Finnish",
}

export interface CourseText {
  courseId: string
  languageId: LanguageID
  abbreviation: Abbreviation
  title: Title
  body: string
  createdAt: Date
  updatedAt: Date
}

export enum Abbreviation {
  OhjelmoinninMooc2020 = "ohjelmoinnin-mooc-2020",
}

export enum Title {
  OhjelmoinninMooc2020 = "Ohjelmoinnin Mooc 2020",
}

export type QuizPointsGrantingPolicy =
  | "grant_whenever_possible"
  | "grant_only_when_answer_fully_correct"

export interface Item {
  id: string
  quizId: string
  type: Type
  order: number
  minWords: number | null
  maxWords: number | null
  minValue: number | null
  maxValue: number | null
  validityRegex: null | string
  formatRegex: null
  multi: boolean
  usesSharedOptionFeedbackMessage: boolean
  createdAt: Date
  updatedAt: Date
  texts: { [key: string]: null | string }[]
  options: Option[]
}

export interface Option {
  id: string
  quizItemId: string
  order: number
  correct: boolean
  createdAt: Date
  updatedAt: Date
  texts: OptionText[]
}

export interface OptionText {
  quizOptionId: string
  languageId: LanguageID
  title: string
  body: null
  successMessage: null | string
  failureMessage: null | string
  createdAt: Date
  updatedAt: Date
}

export enum Type {
  Checkbox = "checkbox",
  Essay = "essay",
  MultipleChoice = "multiple-choice",
  Open = "open",
  Scale = "scale",
}

export interface QuizText {
  quizId: string
  languageId: LanguageID
  title: string
  body: string
  createdAt: Date
  updatedAt: Date
}

export interface IPeerReviewCollection {
  id: string
  quizId: string
  questions: IPeerReviewCollectionQuestion[]
  texts: IPeerReviewCollectionText[]
}

export interface IPeerReviewCollectionQuestionText {
  peerReviewQuestionId: string
  languageId: string
  title: string
  body: string
}

export interface IPeerReviewCollectionQuestion {
  id: string
  quizId: string
  peerReviewCollectionId: string
  default: boolean
  type: PeerReviewQuestionType
  answerRequired: boolean
  order: number
  texts: IPeerReviewCollectionQuestionText[]
}
