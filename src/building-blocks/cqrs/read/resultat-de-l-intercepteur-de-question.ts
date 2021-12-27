import Question from './question'
import ModeleDeLecture from './modele-de-lecture'

export default interface ResultatDeLIntercepteurDeQuestion {
  question: Question
  modeleDeLecture?: ModeleDeLecture
}
