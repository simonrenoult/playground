import ModeleDeLecture from './modele-de-lecture'
import Question from './question'

export default interface GestionnaireDeQuestion<Q extends Question = Question, R extends ModeleDeLecture = ModeleDeLecture> {
  executer(q: Q): R

  ecoute(q: Question): boolean
}
